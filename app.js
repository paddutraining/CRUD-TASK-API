const express=require('express');
const app=express();
const mongoose=require('./database/mongoose');
const tasklist=require('./database/models/taskList');
const task=require('./database/models/task');
var cors = require('cors')
app.use(cors()) 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', '*');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
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
const deleteAllTasksFromthistasklist=(tasklist)=>{
    task.deleteMany({_tasklistid:req.params.tasklistid}).then(()=>{return tasklist}).catch((error)=>
    console.log(error))
}

   const statustasklist= tasklist.findByIdAndDelete({_id:req.params.tasklistid}).then((list)=>{
        deleteAllTasksFromthistasklist(tasklist)
     
    }).catch((error)=>{
        res.status(500)
        console.log(error)})
        res.status(200).send(statustasklist)   
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
    console.log(req.params)
    
    task.findByIdAndUpdate({_tasklistid:req.params.tasklistid,_id:req.params.taskid},
        {$set:req.body}).then((list)=>{
         
            res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// creat task in particular tasklist
// delete task in particular tasklist
app.delete('/tasklists/:tasklistid/tasks/:taskid', (req,res)=>{
    task.findOneAndDelete({_tasklistid:req.params.tasklistid,_id:req.params.taskid}).then((list)=>{res.status(200).send(list)}).catch((error)=>{
        res.status(500)
        console.log(error)})
    })
// creat task in particular tasklist
app.listen(3000, ()=>{
    console.log("server started success fully on port number 3000");
})
