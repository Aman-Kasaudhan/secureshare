const socketRoomMap = new Map();

class SocketManager {

    addSocket(socketId, roomCode) {

        socketRoomMap.set(socketId, roomCode);

    }

    getRoom(socketId) {

        return socketRoomMap.get(socketId);

    }

    removeSocket(socketId) {

        socketRoomMap.delete(socketId);

    }

    hasSocket(socketId) {

        return socketRoomMap.has(socketId);

    }

    getAllSockets() {

        return socketRoomMap;

    }

}

module.exports = new SocketManager();