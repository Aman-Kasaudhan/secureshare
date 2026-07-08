const cloudinary = require("../config/cloudinary");
const fileManager = require("./fileManager");

async function deleteRoomCloudinaryFiles(roomCode) {

    const files = fileManager.getFiles(roomCode);
//  console.log("Room:", roomCode);
//     console.log("Files:", files);
    for (const file of files) {

        try {

            await cloudinary.uploader.destroy(
                file.publicId,
                {
                    resource_type: file.resourceTy
                }
            );

        } catch (error) {

            console.log(
                `Failed to delete ${file.publicId}`,
                error.message
            );

        }

    }

    fileManager.deleteRoomFiles(roomCode);

}

module.exports = deleteRoomCloudinaryFiles;