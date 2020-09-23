
var express=require('express');
var app=express();
app.use(express.static('public'));
server=app.listen(8080);
app.use('/public',express.static('public'));
app.set('view engine', 'ejs'); 
const io=require("socket.io")(server);

io.on('connection',function(socket){
    console.log("New user connected");

    socket.username="anonymous";
    socket.on("username",function(data){
        console.log(data.username);
        socket.username=data.username;
        io.sockets.emit("is_online",{text:socket.username+" has joined the chat",name:socket.username})
    });
    socket.on('new_message',function(data){
        console.log(data.new_message);
        console.log("listening");
        console.log(data.time);
        io.sockets.emit('new_message',{new_message:data.new_message,username:socket.username,time:data.time});
    });
    socket.on("typing",function(data){
        console.log("on focus");
        socket.broadcast.emit("typing",{username:data.name});
    })
    
});
app.get('/',function(req,res){
    res.render("index.ejs");
});

