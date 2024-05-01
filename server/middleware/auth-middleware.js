import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export function verifyToken(req, res, next){
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            tokenNotFound: true,
            message: 'Token not found'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded)
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        return res.status(401).json({
            tokenInvalid: true,
            message: 'Invalid token'
        })
    }
}