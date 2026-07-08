const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {

        type: String,

        required: true,

        trim: true

    },

    lastName: {

        type: String,

        trim: true,

        default: ""

    },

    email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true

    },

    password: {

        type: String,

        required: true

    },

    image: {

        type: String,

        default: ""

    },

          roomsCreated:{

            type: Number,

           default: 0

        },
      roomsJoined: {
        type: Number,
        default: 0
         },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model("User", userSchema);