// Node Server 
// socket io

const io= require('socket.io')(8000,{
    cors:{
        origin:["http://127.0.0.1:5501"],
    },
})

const user = {};

io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log("new user",name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message: message, name: user[socket.id]});
    });
    socket.on('disconnect', message=>{
        console.log(user[socket.id],"left the chat" );
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    });
})