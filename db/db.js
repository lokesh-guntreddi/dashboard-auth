const mongoose = require('mongoose')

const Mongodb = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log(
        "mongodb connected"
    );
}).catch((err)=>{
    console.error(err);
})
}
module.exports= Mongodb;