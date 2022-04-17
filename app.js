const express=require('express');
const app=express();
const mongoose=require('./database/mongoose');
const tasklist=require('./database/models/taskList');
const task=require('./database/models/task');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:4200']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());
app.get('/tasklists', (req,res)=>{
    tasklist.find({}).then((list)=>{res.status(201).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})

})
app.get('/tasklists/:tasklistid', (req,res)=>{
    tasklist.find({_id:req.params.tasklistid}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
app.put('/tasklists/:tasklistid', (req,res)=>{
    tasklist.findOneAndUpdate({_id:req.params.tasklistid},
        {$set:req.body}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
        
})
app.delete('/tasklists/:tasklistid', (req,res)=>{
    tasklist.findByIdAndDelete({_id:req.params.tasklistid}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
        
})
app.patch('/tasklists/:tasklistid', (req,res)=>{
    tasklist.findOneAndUpdate({_id:req.params.tasklistid},
        {$set:req.body}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
        
})
app.post('/tasklists', (req,res)=>{
    console.log(req)
    let tasklistobj={'title':req.body.title};
    tasklist(tasklistobj).save().then((list)=>{res.status(202).send(list)}).catch((error)=>{
        res.status(500);
        console.log(console.log(error))})

})
// get all task from particullar tasklist
app.get('/tasklists/:tasklistid/tasks', (req,res)=>{
    task.find({_tasklistid:req.params.tasklistid}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// get all task from particullar tasklist
// creat task in particular tasklist
app.post('/tasklists/:tasklistid/tasks', (req,res)=>{
    let taskobj={'title':req.body.title, 
    '_tasklistid':req.params.tasklistid};
    task(taskobj).save().then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// creat task in particular tasklist
// get 1 task from particullar tasklist
app.get('/tasklists/:tasklistid/tasks/:taskid', (req,res)=>{
    task.findOne({_tasklistid:req.params.tasklistid
    ,_id:req.params.taskid}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// get 1 task from particullar tasklist
// patch task in particular tasklist
app.patch('/tasklists/:tasklistid/tasks/:taskid', (req,res)=>{
    task.findOneAndUpdate({_tasklistid:req.params.tasklistid,id:req.params.taskid},
        {$set:req.body}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// creat task in particular tasklist
// delete task in particular tasklist
app.delete('/tasklists/:tasklistid/tasks/:taskid', (req,res)=>{
    task.findOneAndDelete({_tasklistid:req.params.tasklistid,id:req.params.taskid}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// creat task in particular tasklist
app.listen(3000, ()=>{
    console.log("server started success fully on port number 3000");
})
