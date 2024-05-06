import { sioVerifyToken } from '../middleware/sio-auth-middleware.js';
import chatSocket from './chatSocket.js';
import friendSocket from './friendSocket.js';
import notificationSocket from './notificationSocket.js';

function initSockets(io) {
    io.use(sioVerifyToken).on('connection', (socket) => {
        chatSocket(io, socket);
        friendSocket(io, socket);
        notificationSocket(io, socket);
    })
}

export default initSockets;