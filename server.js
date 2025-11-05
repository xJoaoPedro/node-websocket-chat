const { prototype } = require('events');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = require('./config/express')();
const port = app.get('port');

const server = http.createServer(app);
const io = socketIo(server);

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { id: socket.id, text: msg });
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});