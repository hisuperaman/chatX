import { sioVerifyToken } from '../middleware/sio-auth-middleware.js';
import chatSocket from './chatSocket.js';
import friendSocket from './friendSocket.js';

function initSockets(io) {
    io.use(sioVerifyToken).on('connection', (socket) => {
        chatSocket(io, socket);
        friendSocket(io, socket);
    })
}

export default initSockets;