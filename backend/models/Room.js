const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({

    clientId: {

        type: String,

        required: true

    },

    socketId: {

        type: String,

        default: null

    },

    displayName: {

        type: String,

        default: "Anonymous"

    },

    joinedAt: {

        type: Date,

        default: Date.now

    },

    online: {

        type: Boolean,

        default: true

    },

    isOwner: {

        type: Boolean,

        default: false

    }

}, { _id: false });

const roomSchema = new mongoose.Schema({

    roomCode: {

        type: String,

        unique: true,

        required: true,

        uppercase: true

    },

    owner: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    status: {

        type: String,

        enum: ["waiting", "active"],

        default: "waiting"

    },

    maxUsers: {

        type: Number,

        default: 2

    },

    currentUsers: {

        type: Number,

        default: 0

    },

    participants: [

        participantSchema

    ],

    settings: {

        allowChat: {

            type: Boolean,

            default: true

        },

        allowFileSharing: {

            type: Boolean,

            default: true

        },

        allowDownload: {

            type: Boolean,

            default: true

        },

        allowViewOnly: {

            type: Boolean,

            default: true

        }

    },

    createdAt: {

        type: Date,

        default: Date.now

    },

     expiresAt: {
    type: Date,
    default: () =>
        new Date(
            Date.now() +
            Number(process.env.ROOM_EXPIRY) * 60 * 1000
        )
},
    isActive: {

    type: Boolean,

    default: true

},

});

module.exports = mongoose.model("Room", roomSchema);