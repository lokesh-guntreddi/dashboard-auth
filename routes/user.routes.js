const express = require("express");
const router = express.Router()
const User = require('../models/User.models')
const bcrypt = require('bcrypt')
router.get('/register',(req,res)=> {
    try{
        res.render("register")
    }
    catch (err){
        console.error(err);
    }

})
router.get('/login',(req , res)=> {
        try {
            res.render("login")
        }
        catch(err){
            console.error(err);
            
        }
})
router.get('/dashboard',(req , res)=> {
        try {
            res.render("dashboard",  { 
  username: "Lokesh",
  email: "you@domain.com" 
})
        }
        catch(err){
            console.error(err);
            
        }
})

 router.post('/register',async (req , res )=> {
    try{
          console.log("Form Data:", req.body);
         const {username , email , password } = req.body
         const hash = await bcrypt.hash(password, 10)
    const user = new User({
        username , email , password : hash 
    })
    await user.save()
     res.redirect("/mypage/login");
 } catch(err){
    console.error(err);
    res.status(500).send("Something went wrong during registration.");
 }
 })


 router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");
   req.session.userId = user._id;
  req.session.username = user.username;
    res.render("dashboard" , {
        name : user.username,
        email : user.email 
    })
 })
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.render("login");
  });
});

module.exports = router