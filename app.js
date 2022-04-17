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
app.listen(3000, ()=>{
    console.log("server started success fully on port number 3000");
})
