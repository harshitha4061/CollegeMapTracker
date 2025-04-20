const express = require('express');
const app = express();
const http=require('http');
const socketio=require('socket.io')
const ejs = require('ejs');

const server=http.createServer(app)
const io=socketio(server)

const path = require("path");
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "Public")));

io.on("connection",(socket)=>{
    socket.on("user-location",(data)=>{
        socket.emit("recieved-location",{id:socket.id,...data})
    })
})

app.get('/', (req, res) => {
    res.render("app");
});

server.listen(3000, () => {
    console.log("listening...");
});
