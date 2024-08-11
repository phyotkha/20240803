import express from "express";
import { Server } from "socket.io";
import http from "http";
import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";

const app = express();

// Scoket Connection
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

// Online user 
const onlineUser = new Set();

io.on('connection', async (socket) => {
    console.log("Connected User: ", socket.id);

    const token = socket.handshake.auth.token;

    // Current User Details 
    const user = await getUserDetailsFromToken(token);

    // Create room 
    socket.join(user?._id);
    onlineUser.add(user?._id);

    io.emit('OnlineUser', Array.from(onlineUser))

    // Disconnect
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id?.toString());
        console.log('Disconnect User: ', socket.id);
    })
})

export { app, server };