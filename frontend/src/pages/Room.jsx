import { useParams, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useEffect,useRef } from "react";
import ParticipantCard from "../components/ParticipantCard";
import socket from "../socket/socket";
import "../style/Room.css";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import FileCard from "../components/FileCard";
import FileUpload from "../components/FileUpload";
import { getClientId } from "../utils/clientId";
function Room() {
    const { roomCode } = useParams();
    const navigate = useNavigate();

const clientId = getClientId();
    const [message, setMessage] = useState("");
const [showSidebar, setShowSidebar] = useState(false);

const [messages, setMessages] = useState([]);
const [loading, setLoading]=useState(false)
const bottomRef = useRef(null);
const [timeLeft, setTimeLeft] = useState(null);
const [typing, setTyping] = useState("");
const [connectionStatus, setConnectionStatus] = useState("Connecting...");
const typingTimeout = useRef(null);
const myName = localStorage.getItem(`displayName_${roomCode}`);
const [room, setRoom] = useState({
        roomCode,
        status: "waiting",
        currentUsers: 1,
        maxUsers: 5,
        timer: "10:00",
        participants: [],
        messages: [],
        files: [],
    });
useEffect(() => {

    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };

}, []);
useEffect(() => {

    if (!room.expiresAt) {

        setTimeLeft(null);

        return;

    }

    const updateTimer = () => {

        const remaining = Math.max(
            0,
            Math.floor(
         (new Date(room.expiresAt).getTime()-Date.now())/1000
            )
          );

        setTimeLeft(remaining);

    };

    updateTimer();

    const interval = setInterval(

        updateTimer,

        1000

    );

    return () => clearInterval(interval);

}, [room.expiresAt]);

const formatTime=()=>{

    if (room.expiresAt === null || room.expiresAt === undefined) {

        return "Room Active";

    }
    if (timeLeft === null) {
        return "Room Active";
    }

    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    return `${min}:${sec.toString().padStart(2, "0")}`;
};
 
const sendMessage = () => {

    if (!message.trim()) return;

    socket.emit("send-message", {
        roomCode,
        message,
        clientId,
    });

    setMessage("");

};

const handleKeyDown = (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

};
useEffect(() => {

    bottomRef.current?.scrollIntoView({

        behavior: "smooth"

    });

}, [messages]);

    
 
    useEffect(() => {
// async function d(){
 
//     try {
//    setLoading(true);
//    await api.get(`/api/rooms/${roomCode}`);

// }
// catch {
// localStorage.removeItem(`displayName_${roomCode}`);
// // navigate("/");
// setLoading(false);


// }
// } 
// d()

        // console.log(room) 
          socket.on("room-state", ({ room, systemMessage }) => {
            //  console.log("expiresAt:", room.expiresAt);  
            setRoom(prev => ({
                  ...prev,
                  ...room,
                  participants: room.participants || [],
                  files: room.files || []
                }));
// console.log(room)

    if (systemMessage) {

        setMessages((prev) => [

            ...prev,

            systemMessage

        ]);

    }

});
        socket.on("receive-message", (chat) => {

            // console.log(chat)

    setMessages((prev) => [...prev, chat]);

});

socket.on("receive-file",(file) => {setRoom(prev => ({

            ...prev,
            files: [...prev.files,file]
        }));
    });

socket.on("user-typing", ({ displayName }) => {

    setTyping(`${displayName} is typing...`);

});

socket.on("user-stop-typing", () => {

    setTyping("");

});

//     socket.connect();

// socket.once("connect", () => {

//     setConnectionStatus("Connected");

//     const displayName =
//     localStorage.getItem(`displayName_${roomCode}`) ||
//     "Anonymous";
// socket.emit("join-room", {
//     roomCode,
//     clientId,
//     displayName
// });
const joinSocketRoom = () => {

    const displayName =
        localStorage.getItem(`displayName_${roomCode}`) ||
        "Anonymous";

    socket.emit("join-room", {
        roomCode,
        clientId,
        displayName
    });

};

if (socket.connected) {

    setConnectionStatus("Connected");

    joinSocketRoom();

} else {

    socket.connect();

    socket.once("connect", () => {

        setConnectionStatus("Connected");

        joinSocketRoom();

    });

}

    // socket.emit("join-room", {
    
    //     roomCode,
    
    //     clientId,
    
    //     displayName: "Anonymous"
    
    // });
    
// });    

socket.on("disconnect", (r) => {

    setConnectionStatus("Disconnected");
    // console.log('reason',r)

});

socket.on("reconnect", () => {

    setConnectionStatus("Reconnected");

});
socket.on("room-deleted", ({ message }) => {
localStorage.removeItem(`displayName_${roomCode}`);
    toast.warning(message);

    navigate("/");

});

socket.on("room-expired", ({ message }) => {
localStorage.removeItem(`displayName_${roomCode}`);
    toast.warning(message);

    navigate("/");

});
  

   

    return () => {

        socket.off("room-state");
// socket.off("room-updated");
socket.off("receive-message");
socket.off("receive-file");
socket.off("user-typing");
socket.off("user-stop-typing");
// socket.off("connect");
socket.removeAllListeners();
socket.disconnect();

socket.off("disconnect");

socket.off("reconnect");
socket.disconnect();
 socket.off("room-deleted");

    socket.off("room-expired");

    };

}, [roomCode,navigate]);
 
     

    const copyRoomCode = () => {
        navigator.clipboard.writeText(room.roomCode);
        toast.success("Room Code Copied");
    };

    const copyInviteLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/join-room/${room.roomCode}`
        );

         toast.success("Invite Link Copied");
    };

    const leaveRoom = async () => {
        try{
            setLoading(true)
                    socket.emit("leave-room");
                    await api.post("/api/rooms/leave-room",{roomCode});
            
                 localStorage.removeItem("displayName");
              navigate("/");
            setLoading(false)


        }
        catch(error){
            setLoading(false)

              navigate("/");

        }

// console.log(room)
// const [showSidebar, setShowSidebar] = useState(false);
        
    };
// console.log("Frontend room:", room);
    return (
        <div className="room-page">
            {loading && <Loader/>}
            {/* ================= Header ================= */}

            <header className="room-header">
                <div className="logo">
                    <h2>SecureShare</h2>
                    <span>Room : {room.roomCode}</span>
                </div>

                <div className="room-info">
                    <span>
                        👥 {room.currentUsers}/{room.maxUsers} 
                    </span>

                    <span>⏳ {formatTime()}</span>
  <span
        className={
            connectionStatus === "Connected"
                ? "connected"
                : connectionStatus === "Reconnected"
                ? "reconnected"
                : "disconnected"
        }
    >

        {connectionStatus}

    </span>
                    
                </div>

                <button
                    className="leave-btn"
                    onClick={leaveRoom}
                >
                    Leave Room
                </button>
            </header>

            {/* ================= Waiting Screen ================= */}

            {room.status === "waiting" ? (
                <div className="waiting-container">
                    <h1>Waiting For Participants...</h1>

                    <p>
                        Share this room code with your friends.
                    </p>

                    <div className="room-code">
                        {room.roomCode}
                    </div>

                    <div className="waiting-buttons">
                        <button onClick={copyRoomCode}>
                            Copy Room Code
                        </button>

                        <button onClick={copyInviteLink}>
                            Copy Invite Link
                        </button>
                    </div>

                    <div className="status-box">
                        <p>
                            Connected Users :
                            <strong>
                                {" "}
                                {room.currentUsers}/{room.maxUsers}
                            </strong>
                        </p>

                        <p>Room Status : Waiting</p>

                        <p>
                            Auto Delete In : {formatTime()}
                        </p>
                    </div>
                </div>
            ) : (
                /* ================= Chat Layout ================= */
<div className="chat-layout">

    <button
        className="menu-btn"
        onClick={() => setShowSidebar(true)}
    >
        ☰
    </button>

    <aside className={`sidebar ${showSidebar ? "open" : ""}`}>

        <button
            className="close-btn"
            onClick={() => setShowSidebar(false)}
        >
            ✕
        </button>
        

        <h3>Participants</h3>

        {room.participants.length === 0 ? (
            <p>No Participants</p>
        ) : (
            room.participants.map((user) => (
                <ParticipantCard
                    key={user.socketId}
                    user={user}
                />
            ))
        )}

        <hr />

        <h3>Shared Files</h3>

        {(room.files || []).length === 0 ? (
            <p>No Files Shared</p>
        ) : (
            room.files.map((file) => (
                <FileCard
                    key={file.id}
                    file={file}
                />
            ))
        )}
    </aside>
    {showSidebar && (
    <div
        className="overlay"
        onClick={() => setShowSidebar(false)}
    />
)}

    <section className="chat-wrapper">

        <div className="messages-wrapper">

            {messages.length === 0 ? (
                <p className="empty-message">
                    No Messages Yet
                </p>
            ) : (
               messages.map((msg) => (
    <div
        key={msg.id}
        className={`message ${
    msg.clientId === clientId
        ? "my-message"
        : "other-message"
}`}
    >
        <strong>{msg.senderName}</strong>

        <p>{msg.message}</p>
    </div>
))
            )}

            <div ref={bottomRef}></div>

        </div>

        <div className="message-box">

            <FileUpload
                roomCode={room.roomCode}
                socket={socket}
                // onFileSelect={setSelectedFile}
            />

            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);

                    socket.emit("typing", {
                        roomCode,
                        displayName: "Anonymous",
                    });

                    clearTimeout(typingTimeout.current);

                    typingTimeout.current = setTimeout(() => {
                        socket.emit("stop-typing", {
                            roomCode,
                        });
                    }, 1000);
                }}
                onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>
                Send
            </button>

        </div>

    </section>

</div>
            )}
        </div>
    );
}

export default Room;