const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('get-document', (documentID) => {
    const data = '';
    socket.join(documentID);
    socket.emit('load-document', data);
    // listening to custom send-changes from the client
    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentID).emit('receive-changes', delta);
    });
  });
});
