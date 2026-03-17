const express=require('express')
const app=express()

const http=require("http")
const {Server}=require("socket.io")
const server= http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173","https://gpu-cluster-monitor.vercel.app"],
      methods: ["GET", "POST"]
    }
  })

const {Worker}=require('worker_threads')
const gpuWorker=new Worker("./gpuWorker.js")


let gpuData=[]

io.on("connection",(socket)=>{
    console.log("Socket Connection Successful")

    socket.emit("gpu-data",gpuData)
})

gpuWorker.on("message",(data)=>{
    gpuData=data

    io.emit("gpu-data",gpuData)
})

server.listen(9090,()=>{
    console.log(`9090 is listening`)
})

app.get("/",(req,res)=>{
  res.send("<h1>This is root pagee</h1>")
})