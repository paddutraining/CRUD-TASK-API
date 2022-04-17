
const mongoose=require('mongoose');
const taskListSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    }
})
const tasklist=mongoose.model('tasklist',taskListSchema);
module.exports=tasklist;
