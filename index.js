// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");


// const cors = require("cors")
// app.use(cors())

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST'],
//     }
// });

// // app.get('/', (req, res) => {
// //   res.send('<h1>Hello w</h1>');
// // });



// server.listen(3001, () => {
//   console.log('server is running');
// });

// io.on("connection", (socket) => {
//   console.log(`connnnected ${socket.id}`);

//   socket.on("message", (data) => {
//     console.log('i got it!!!')
//     console.log(data)
//     socket.emit('receive_message', data)
//   });
// });