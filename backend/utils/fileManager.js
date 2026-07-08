const roomFiles = new Map();

function addFile(roomCode, file) {

    if (!roomFiles.has(roomCode)) {

        roomFiles.set(roomCode, []);

    }

    roomFiles.get(roomCode).push(file);

}

function getFiles(roomCode) {

    return roomFiles.get(roomCode) || [];

}

function getFile(roomCode, fileId) {

    const files = getFiles(roomCode);

    return files.find(

        file => file.id === fileId

    );

}

function deleteRoomFiles(roomCode) {

    roomFiles.delete(roomCode);

}

module.exports = {

    addFile,

    getFiles,

    getFile,

    deleteRoomFiles

};