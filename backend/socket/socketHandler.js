// const roomManager = require("../utils/roomManager");
// const socketManager = require("./socketManager");
// const socketRoomMap = new Map();
// const reconnectTimers = new Map();
// const crypto = require("crypto");
// module.exports = (io) => {

//     io.on("connection", (socket) => {

//         console.log("Connected :", socket.id);

//         socket.on("send-message", ({ roomCode, message }) => {

//     const room = roomManager.getRoom(roomCode);

//     if (!room) {

//         socket.emit("error", {

//             message: "Room Not Found"

//         });

//         return;

//     }

//     const participant = room.participants.find(

//         (user) => user.socketId === socket.id

//     );

//     if (!participant) {

//         return;

//     }

//     const chatMessage = {

//         senderId: socket.id,

//         senderName: participant.displayName,

//         message,

//         type: "text"

//     };

//     roomManager.addMessage(

//         roomCode,

//         chatMessage

//     );

//     io. io.to(roomCode).emit("room-state", {
//     room: updatedRoom,
//     systemMessage: {
//         id: crypto.randomUUID(),
//         type: "system",
//         senderName: "System",
//         message: `${participant.displayName} joined the room.`,
//         createdAt: Date.now()
//     }
// });

// });
// socket.on(

// "typing",

// ({

// roomCode,

// displayName

// })=>{

// socket.to(roomCode).emit(

// "user-typing",

// {

// displayName

// }

// );

// });
// socket.on(

// "stop-typing",

// ({

// roomCode

// })=>{

// socket.to(roomCode).emit(

// "user-stop-typing"

// );

// });


// socket.on("send-message", ({ roomCode, message }) => {

//     const room = roomManager.getRoom(roomCode);

//     if (!room) return;

//     const participant = room.participants.find(

//         (user) => user.socketId === socket.id

//     );

//     if (!participant) return;

//     const chat = {

//         id: crypto.randomUUID(),

//         senderId: socket.id,

//         senderName: participant.displayName || "Anonymous",

//         message,

//         createdAt: Date.now()

//     };

//     roomManager.addMessage(roomCode, chat);

//     io.to(roomCode).emit("room-state", {
//     room: updatedRoom,
//     systemMessage: {
//         id: crypto.randomUUID(),
//         type: "system",
//         senderName: "System",
//         message: `${participant.displayName} joined the room.`,
//         createdAt: Date.now()
//     }
// });

// });
// socket.on("typing", ({ roomCode }) => {

//     socket.to(roomCode).emit(

//         "user-typing",

//         {

//             socketId: socket.id

//         }

//     );

// });
//          socket.on("join-room", ({ roomCode, clientId, displayName }) => {

//     const room = roomManager.getRoom(roomCode);

//     if (!room) {

//         socket.emit("error", {
//             message: "Room not found"
//         });

//         return;
//     }

//     const onlineUsers = room.participants.filter(
//     user => user.online
// ).length;

// if (onlineUsers >= room.settings.maxUsers) {

//     socket.emit("error", {

//         message: "Room Full"

//     });

//     return;

// }

//     // Join Socket.IO Room
//     socket.join(roomCode);

//     // Store socket -> room mapping
//     socketManager.addSocket(socket.id, roomCode);

//     // Cancel room deletion timer
// roomManager.cancelRoomTimer(roomCode);

// /* -----------------------------
//    Reconnection
// ------------------------------*/

// const oldParticipant = room.participants.find(
//     (user) =>
//         user.clientId === clientId &&
//         !user.online
// );

// if (oldParticipant) {

//     oldParticipant.socketId = socket.id;

//     oldParticipant.online = true;

//     oldParticipant.lastSeen = null;

//     socketManager.addSocket(socket.id, roomCode);

//     const reconnectTimer = reconnectTimers.get(oldParticipant.socketId);

//     if (reconnectTimer) {

//         clearTimeout(reconnectTimer);

//         reconnectTimers.delete(oldParticipant.socketId);

//     }

//     const updatedRoom = roomManager.getRoom(roomCode);

//     io.to(roomCode).emit("room-state", {

//         room: updatedRoom,

//         systemMessage: {

//             id: crypto.randomUUID(),

//             type: "system",

//             senderName: "System",

//             message: `${oldParticipant.displayName} reconnected.`,

//             createdAt: Date.now()

//         }

//     });

//     return;

// }

// /* -----------------------------
//    New Participant
// ------------------------------*/

// const isOwner = room.participants.length === 0;

// const participant = {
//      clientId,
//     socketId: socket.id,

//     roomCode,

//     displayName: displayName?.trim() || "Anonymous",

//     joinedAt: Date.now(),

//     isOwner,

//     online: true

// };

// roomManager.addParticipant(roomCode, participant);

// if (isOwner) {

//     roomManager.setOwner(roomCode, socket.id);

// }

// const updatedRoom = roomManager.getRoom(roomCode);

// socketManager.addSocket(socket.id, roomCode);

// io.to(roomCode).emit("room-state", {

//     room: updatedRoom,

//     systemMessage: {

//         id: crypto.randomUUID(),

//         type: "system",

//         senderName: "System",

//         message: `${participant.displayName} joined the room.`,

//         createdAt: Date.now()

//     }

// });
    
// });

//         socket.on(

//     "file-uploaded",

//     ({

//         roomCode,

//         file

//     }) => {

//         io.to(roomCode).emit(

//             "receive-file",

//             file

//         );

//     }

// );

//         socket.on("disconnect", () => {

//     const roomCode = socketManager.getRoom(socket.id);

//     if (!roomCode) return;

//     roomManager.removeParticipant(roomCode, socket.id);

//     io.to(roomCode).emit("room-updated", {

//         roomCode,

//         totalUsers: roomManager
//             .getRoom(roomCode)
//             .participants.filter(u => u.online).length,

//         maxUsers: roomManager
//             .getRoom(roomCode)
//             .settings.maxUsers,

//         participants: roomManager
//             .getRoom(roomCode)
//             .participants

//     });

//     const timer = setTimeout(() => {

//         roomManager.deleteParticipant(

//             roomCode,

//             socket.id

//         );

//         socketManager.removeSocket(socket.id);

//         const room = roomManager.getRoom(roomCode);

//         if (

//             room &&

//             room.participants.length === 0

//         ) {

//             roomManager.startRoomTimer(roomCode);

//         }

//     }, 10000);

//     reconnectTimers.set(socket.id, timer);

// });

//     });

// };

const {startRoomExpiryTimer,cancelRoomExpiryTimer} = require("../utils/roomTimer");
// const roomManager = require("../utils/roomManager");
const socketManager = require("./socketManager");
const Room = require("../models/Room");
const crypto = require("crypto");
const roomFiles = new Map();
const reconnectTimers = new Map();
const fileManager = require("../utils/fileManager");
module.exports = (io) => {

    io.on("connection", (socket) => {

        // console.log("Connected :", socket.id);

         
       socket.on("join-room", async ({ roomCode, clientId, displayName }) => {

    try {

        const room = await Room.findOne({ roomCode });
        if (!room) {

            socket.emit("error", {

                message: "Room Not Found"

            });

            return;

        }

       if (room.expiresAt &&room.expiresAt <= new Date()) {

    socket.emit("error", {

        message: "Room Expired"

    });

    return;

}
// console.log(room)
        const onlineUsers = room.participants.filter(

            user => user.online

        ).length;

        if (onlineUsers >= room.maxUsers) {

            socket.emit("error", {

                message: "Room Full"

            });

            return;

        }

        socket.join(roomCode);

        socketManager.addSocket(

            socket.id,

            roomCode

        );

        let participant = room.participants.find(

            user => user.clientId === clientId

        );

        if (participant) {

            participant.socketId = socket.id;

            participant.online = true;

            participant.lastSeen = null;

        }

        else {

            participant = {

                clientId,

                socketId: socket.id,

                displayName:

                    displayName?.trim() ||

                    "Anonymous",

                joinedAt: new Date(),

                online: true,

                isOwner:

                    room.participants.length === 0

            };

            room.participants.push(participant);

        }

        room.currentUsers = room.participants.filter(

            user => user.online

        ).length;

        room.status =room.currentUsers >= 2 ?"active":"waiting";
       
   if (room.status=="active") {

    cancelRoomExpiryTimer(roomCode);

    room.expiresAt = null;

}

        await room.save();
const updatedRoom = await Room.findOne({ roomCode }).lean();

// console.log(updatedRoom.expiresAt);

io.to(roomCode).emit("room-state", {
    room: updatedRoom,
    systemMessage: {
        id: crypto.randomUUID(),
        senderName: "System",
        message: `${participant.displayName} joined the room.`,
        createdAt: Date.now()
    }
});




    }

    catch(error){

        // console.log(error);

    }

});

/* ==========================================
                SEND MESSAGE
========================================== */

socket.on("send-message", async ({ roomCode, message , clientId}) => {

    try {

        const room = await Room.findOne({ roomCode });

        if (!room) {

            socket.emit("error", {

                message: "Room Not Found"

            });

            return;

        }

        const participant = room.participants.find(

            user => user.socketId === socket.id

        );

        if (!participant) {

            return;

        }

        // const chat = {

        //     id: crypto.randomUUID(),

        //     senderId: socket.id,

        //     senderName: participant.displayName,

        //     message,

        //     createdAt: Date.now(),
        //     clientId,

        //     type: "text"

        // };


        const chat = {
    id: crypto.randomUUID(),
    senderName: participant.displayName,
    clientId,
    message,
    createdAt: Date.now()
};

        io.to(roomCode).emit("receive-message", chat);

    }

    catch (error) {

        // console.log(error);

    }

});
/* ==========================================
              USER TYPING
========================================== */

socket.on("typing", async ({ roomCode }) => {

    try {

        const room = await Room.findOne({ roomCode });

        if (!room) return;

        const participant = room.participants.find(

            user => user.socketId === socket.id

        );

        if (!participant) return;

        socket.to(roomCode).emit("user-typing", {

            displayName: participant.displayName

        });

    }

    catch (error) {

        // console.log(error);

    }

});

socket.on("stop-typing", ({ roomCode }) => {

    socket.to(roomCode).emit("user-stop-typing");

});

/* ==========================================
              FILE SHARING
========================================== */
socket.on(

    "file-uploaded",

    async ({ roomCode, file }) => {

        const room = await Room.findOne({

            roomCode

        });

        if (!room) {

            return;

        }

        fileManager.addFile(

            roomCode,

            file

        );

        io.to(roomCode).emit(

            "receive-file",

            file

        );

    }

);


/* ==========================================
                DISCONNECT
========================================== */

socket.on("disconnect", async () => {

    try {

        // console.log("Disconnected :", socket.id);

        const roomCode = socketManager.getRoom(socket.id);

        if (!roomCode) {

            return;

        }

        const room = await Room.findOne({ roomCode });

        if (!room) {

            socketManager.removeSocket(socket.id);

            return;

        }

        const participant = room.participants.find(

            user => user.socketId === socket.id

        );

        if (!participant) {

            return;

        }

        participant.online = false;

        participant.lastSeen = new Date();

        room.currentUsers = room.participants.filter(

            user => user.online

        ).length;

        room.status =

            room.currentUsers >= 2

                ? "active"

                : "waiting";

                if (room.currentUsers <2) {

    room.expiresAt = new Date(

        Date.now() +

        Number(process.env.ROOM_EXPIRY) *

        60 *

        1000

    );

    startRoomExpiryTimer(roomCode,io);

}
else {

    room.expiresAt = null;

    cancelRoomExpiryTimer(roomCode);

}

        await room.save();

const updatedRoom = await Room.findOne({

    roomCode

});
if (!updatedRoom) {

    socketManager.removeSocket(socket.id);

    return;

}
socketManager.removeSocket(socket.id);

        io.to(roomCode).emit("room-state", {

            room:updatedRoom,

            systemMessage: {

                id: crypto.randomUUID(),

                senderName: "System",

                message: `${participant.displayName} left the room.`,

                createdAt: Date.now()

            }

        });

 

    }

    catch (error) {

        // console.log(error);

    }

});
    })}