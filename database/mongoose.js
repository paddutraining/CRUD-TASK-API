const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mongodb').then(()=>console.log("db connected successfully")).catch((error)=>{
    console.log("connect failed due to :"+error)
})
module.exports=mongoose;


