import express from 'express';
import { Server } from 'socket.io';
import { socketCtrl } from './controllers/socket.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRouter from './routes/user.js';
import dbConnect from './utils/dbConnect.js';
import cors from 'cors';
import messageRouter from './routes/Message.js';
import chatRouter from './routes/chat.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  },
});
socketCtrl(io);


app.use(express.json());

app.use(cors());


app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/chat', chatRouter);




