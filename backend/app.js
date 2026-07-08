const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.set("trust proxy", 1);

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.CLIENT_URL
        ],
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const fileRoutes = require("./routes/fileRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/admin", adminRoutes);

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

app.use((err, req, res, next) => {
    // console.error(err);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;