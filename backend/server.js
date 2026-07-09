require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/database");
const socketHandler = require("./socket/socketHandler");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            process.env.CLIENT_URL,
            // "https://secureshare-alpha.vercel.app"
            "http://localhost:5173"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.set("io", io);

socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:");
    console.error(err);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:");
    console.error(err);
});
