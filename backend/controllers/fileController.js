const Room = require("../models/Room");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const fileManager = require("../utils/fileManager")

const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier");

exports.uploadFile = async (req, res) => {

    try {

        const { roomCode, allowDownload } = req.body;

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }

        const result = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: `SecureShare/${roomCode}`,
                    resource_type: "auto"
                },
                (error, result) => {

                    if (error) reject(error);
                    else resolve(result);

                }
            );

            streamifier
                .createReadStream(req.file.buffer)
                .pipe(stream);

        });

        const fileData = {

            id: crypto.randomUUID(),

            roomCode,

            originalName: req.file.originalname,

            publicId: result.public_id,
             resourceType: result.resource_type,
             url: result.secure_url,
            size: req.file.size,

            mimeType: req.file.mimetype,



            permission: {
                allowDownload:
                    allowDownload === "true"
            },

            uploadedAt: Date.now()

        };
    //   console.log(result)
        fileManager.addFile(roomCode, fileData);

        return res.json({
            success: true,
            file: fileData
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


//  const cloudinary = require("../config/cloudinary");

exports.downloadFile = async (req, res) => {

    try {

        const { roomCode, fileId } = req.params;

        const file = fileManager.getFile(roomCode, fileId);

        if (!file) {

            return res.status(404).json({
                success: false,
                message: "File Not Found"
            });

        }

        if (!file.permission.allowDownload) {

            return res.status(403).json({
                success: false,
                message: "Download Not Allowed"
            });

        }

        const downloadUrl = cloudinary.url(file.publicId, {
            resource_type: file.resourceType,
            secure: true,
            attachment: "attachment"
        });

        return res.redirect(downloadUrl);

    } catch (error) {

        // console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




exports.previewFile = async (req, res) => {
    try {
        
        const { roomCode, fileId } = req.params;
        
        const room = await Room.findOne({ roomCode });
        
        if (!room) {
            
            return res.status(404).json({
                success: false,
                message: "Room Not Found"
            });
            
        }
        
        const file = fileManager.getFile(roomCode, fileId);
        
        if (!file) {
            
            return res.status(404).json({
                success: false,
                message: "File Not Found"
            });
            
        }
        
        // console.log(file.url)
        // Open Cloudinary file in browser
        const previewUrl = cloudinary.url(file.publicId, {
    resource_type: file.resourceType,
    secure: true
});

return res.redirect(previewUrl);

    }

    catch (error) {
// console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};