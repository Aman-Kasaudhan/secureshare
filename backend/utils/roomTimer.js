const Room = require("../models/Room");
const fileManager = require("./fileManager");
const cloudinary = require("../config/cloudinary");

const timers = new Map();

async function deleteRoomFiles(roomCode) {

    const files = fileManager.getFiles(roomCode);

    for (const file of files) {

        try {

            if (file.publicId) {

                await cloudinary.uploader.destroy(
                    file.publicId,
                    {
                        resource_type: file.resourceType || "auto"
                    }
                );

            }

        }

        catch (error) {

            // console.log(
            //     `Failed to delete ${file.publicId}:`,
            //     error.message
            // );

        }

    }

    fileManager.deleteRoomFiles(roomCode);

}

function startRoomExpiryTimer(roomCode, io) {

    if (timers.has(roomCode)) {

        clearTimeout(timers.get(roomCode));

    }

    const timer = setTimeout(async () => {

        try {

            // Delete all Cloudinary files
            await deleteRoomFiles(roomCode);

            // Delete room from MongoDB
            await Room.deleteOne({ roomCode });

            // Notify users
            io.to(roomCode).emit("room-expired", {
                message: "Room expired."
            });

            // Remove all sockets from room
            io.in(roomCode).socketsLeave(roomCode);

        }

        catch (error) {

            // console.log(error);

        }

        finally {

            timers.delete(roomCode);

        }

    }, Number(process.env.ROOM_EXPIRY) * 60 * 1000);

    timers.set(roomCode, timer);

}

function cancelRoomExpiryTimer(roomCode) {

    if (!timers.has(roomCode)) {

        return;

    }

    clearTimeout(timers.get(roomCode));

    timers.delete(roomCode);

}

module.exports = {

    startRoomExpiryTimer,

    cancelRoomExpiryTimer

};