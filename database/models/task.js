

const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    },
    _tasklistid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    complete:{
        type:Boolean,
        default:false,
        required:true

    }
})
const task=mongoose.model('task',taskSchema);
module.exports=task;