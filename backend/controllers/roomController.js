// const roomManager = require("../utils/roomManager");

const Room = require("../models/Room");
const User = require("../models/User");
const { customAlphabet } = require("nanoid");
const deleteRoomCloudinaryFiles = require("../utils/deleteRoomCloudinaryFiles");
const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    6
);
const {startRoomExpiryTimer,cancelRoomExpiryTimer}=require("../utils/roomTimer"); 
exports.createRoom = async (req, res) => {

    try {

        const owner = req.user.id;
        const existingRoom = await Room.findOne({

    owner: owner,

    isActive: true

});

if (existingRoom) {

    return res.status(200).json({

        success: true,

        alreadyExists: true,

        room: existingRoom

    });

}


        let { maxUsers } = req.body;

        // console.log(maxUsers)

        maxUsers = Number(maxUsers);

        if (!maxUsers) {

            maxUsers = 2;

        }

        if (maxUsers < 2 || maxUsers > 10) {

            return res.status(400).json({

                success: false,

                message: "Maximum users must be between 2 and 10"

            });

        }

        let roomCode;

        do {

            roomCode = nanoid();

        }

        while (

            await Room.exists({

                roomCode

            })

        );

        const room = await Room.create({

            roomCode,

            owner,

            maxUsers,

            currentUsers: 0,

            participants: [],

            expiresAt:

                new Date(

                    Date.now() +

                    Number(process.env.ROOM_EXPIRY)*60 *1000
                )
        });

        await User.findByIdAndUpdate(

            owner,

            {

                $inc: {

                    roomsCreated: 1

                }

            }

        );

        return res.status(200).json({

            success: true,

            room

        });

    }

    catch (error) {
// console.log(error.message)
        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// const Room = require("../models/Room");

exports.joinRoom = async (req, res) => {

    try {
        const { roomCode } = req.body;
        
        if (!roomCode) {

            return res.status(400).json({

                success: false,

                message: "Room Code is required"
                
            });

        }
        
        const room = await Room.findOne({roomCode});
        
        if (!room) {
            
            return res.status(404).json({

                success: false,

                message: "Invalid Room Code"
                
            });
            
        }
        
        // console.log(room)
        if (room.expiresAt &&room.expiresAt <= new Date()) {
            
            return res.status(400).json({

                success: false,
                
                message: "Room Expired"
                
            });
            
        }
        
        const onlineUsers = room.participants.filter(

            user => user.online

        ).length;

        if (onlineUsers >= room.maxUsers) {

            return res.status(400).json({

                success: false,

                message: "Room Full"

            });

        }

        return res.status(200).json({

            success: true,

            room: {

                roomCode: room.roomCode,

                maxUsers: room.maxUsers,

                currentUsers: onlineUsers,

                status: room.status

            }

        });

    }

    catch (error) {

        // console.log("error.message");

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.leaveRoom = async (req, res) => {

    try {

        const { roomCode } = req.body;
        

        const room = await Room.findOne({ roomCode });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room Not Found"
            });
        }
        const io = req.app.get("io");

        io.to(roomCode).emit("room-deleted", {
            message: "Room has been deleted by the owner."
        });

        io.in(roomCode).socketsLeave(roomCode);

        await Room.deleteOne({ roomCode });
      await deleteRoomCloudinaryFiles(roomCode);


        room.currentUsers = room.participants.filter(
    user => user.online
).length;

if (room.currentUsers < 2) {

    room.status = "waiting";

    room.expiresAt = new Date(
        Date.now() +
        Number(process.env.ROOM_EXPIRY) * 60 * 1000
    );

    startRoomExpiryTimer(roomCode, io);

    await room.save();
}

        return res.status(200).json({
            success: true,
            message: "Room Deleted"
        });

    } catch (error) {
console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};