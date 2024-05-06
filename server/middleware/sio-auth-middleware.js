import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export function sioVerifyToken(socket, next){
    const token = socket.handshake.auth.token;

    if(!token){
        return next(new Error('Token missing'))
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded)
        socket.id = decoded.userId;
        next();
    }
    catch(e){
        return next(new Error('Invalid token'));
    }
}