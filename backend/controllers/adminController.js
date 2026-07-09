const User = require("../models/User");
const Room = require("../models/Room");

exports.getDashboard = async (req, res) => {
// console.log("qwq")
    try {

        const totalUsers = await User.countDocuments();

        const totalRooms = await Room.countDocuments();

        const activeRooms = await Room.countDocuments({

            status: "Active"

        });

        const expiredRooms = await Room.countDocuments({

            status: "Expired"

        });

        const rooms = await Room.find()

            .populate("owner", "firstName lastName email")

            .sort({ createdAt: -1 });

        const totalParticipants = rooms.reduce(

            (sum, room) => sum + room.totalJoinedUsers,

            0

        );

        return res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,

                totalRooms,

                activeRooms,

                expiredRooms,

                totalParticipants,

                rooms

            }

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