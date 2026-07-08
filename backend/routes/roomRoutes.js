const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const {

    createRoom,

    joinRoom,leaveRoom

} = require("../controllers/roomController");

router.post("/create-room",auth,createRoom);

router.post("/join-room", joinRoom);
router.post(

    "/leave-room",

    auth,

    leaveRoom);
module.exports = router;