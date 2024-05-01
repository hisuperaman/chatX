import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server as SocketIo} from 'socket.io';

import dbConnect from './db-connect.mjs';

import authRoutes from './routes/auth-routes.js';
import otpRoutes from './routes/otp-routes.js';
import homeRoutes from './routes/home-routes.js';
import initSockets from './sockets/index.js';
import { config } from './config.js';

const app = express();

dbConnect();

// cors middleware to handle request from different origin / client side domain
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // or your frontend URL
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Add PATCH method
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   }));
// middleware to automatically parse incoming request body to json for ease
app.use(express.json());


const server = http.createServer(app);


const io = new SocketIo(server, {
    cors: config.clientURL
});

initSockets(io);


// using external routes in the express app
app.use("/auth", authRoutes)
app.use("/otp", otpRoutes)
app.use("/api", homeRoutes)


server.listen("8000", () => {
    console.log("Server started at port 8000");
})