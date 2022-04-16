const express=require('express');
const app=express();
const mongoose=require('./database/mongoose');
app.listen(3000, ()=>{
    console.log("server started success fully on port number 3000");
})
