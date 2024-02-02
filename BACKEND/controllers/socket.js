const activeUsers = {};
const socketIdAndUsername = {};

// import Room from '../models/room.js';


export const socketCtrl = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.id;

  });
};



const logUserConnected = (userId) => {
  console.log(`User ${userId} connected`);
};

