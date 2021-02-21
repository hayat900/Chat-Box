
var express = require('express');
var app = express();
app.use(express.static('public'));
server = app.listen(8080);
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
const io = require("socket.io")(server);

io.on('connection', function (socket) {
    console.log("New user connected");
    var names = [];
    var myname;
    if (myname) {
        for (var i = 0; i < names.length; i++) {
            if (names[i] === myname) {
                console.log("inside" + names[i]);
                names.splice(i, 1);
            }
        }
        for (var j = 0; j < names.length; j++) {
            console.log("hello" + names[j]);
        }
    }
    socket.username = "anonymous";
    socket.on("username", function (data) {
        console.log(data.username);
        names.push(data.username);
        console.log("names" + names);
        socket.username = data.username;
        io.sockets.emit("is_online", { text: socket.username + " has joined the chat", name: names })
    });
    socket.on('new_message', function (data) {
        console.log(data.new_message);
        console.log("listening");
        console.log(data.time);
        io.sockets.emit('new_message', { new_message: data.new_message, username: socket.username, time: data.time });
    });
    socket.on("typing", function (data) {
        console.log("on focus");
        socket.broadcast.emit("typing", { username: data.name });
    })
    socket.on('disconnect', function () {
        if (socket.username != "anonymous") {
            console.log("I am disconnected")
            console.log(socket.username);
            console.log(names.length);
            myname = socket.username;
            for (var i = 0; i < names.length; i++) {
                if (names[i] === socket.username) {
                    console.log("inside" + names[i]);
                    names.splice(i, 1);

                }
            }
            for (var j = 0; j < names.length; j++) {
                console.log("hello" + names[j]);
            }
            io.sockets.emit("user_disconnect", { description: socket.username + "  has left the chat", name: names, username: socket.username });
        }
    });
});

app.get('/', function (req, res) {
    res.render("index.ejs");
});

