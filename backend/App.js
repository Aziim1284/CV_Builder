const connectDB=require('./config/db')
const express =require('express');
const cors=require('cors')
const http=require('http')
const PORT=8899;
const app=express();
app.use(express.json())
app.use(cors());
const httpServer=http.createServer(app);
app.use(express.urlencoded({extended:false}))
const postRoutes=require('./routes/PostRoutes')
app.use(express.static('./'));
require('dotenv').config();
app.use("/api/posts",postRoutes)

connectDB()

httpServer.listen(PORT,(err)=>{
    if(err) throw err
    console.log("working on 8899")
})
















