import axios from "axios";
import { useState } from "react";
import "../style/CreateRoom.css";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from "react-router-dom";
function CreateRoom() {
    const navigate = useNavigate();
const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const [inviteLink, setInviteLink] = useState("");
const [maxUsers, setMaxUsers] = useState(2);
    async function generateRoom() {

        try {

            setLoading(true);

            // const response = await axios.post(`${BASE_URL}/api/rooms/create-room`,{maxUsers});
// console.log(response.data,);
const {data} = await api.post(
    "/api/rooms/create-room",
    {
        maxUsers
    }
);

localStorage.setItem(
    `displayName_${data.room.roomCode}`,
    displayName
);
    navigate(
    
        `/room/${data.room.roomCode}`
    
    );
// }
toast.success("Room created successfully")
// console.log(data)
            setRoomCode(data.room.roomCode);
            setLoading(false);

            setInviteLink(
                `${window.location.origin}/join-room/${data.room.roomCode}`
            );
         

        }
        catch (error) {

            // console.log(error);
            setLoading(false);

            toast.error("unable to create room");

        }
         

    }

    function copyCode() {

        navigator.clipboard.writeText(roomCode);

        toast.success("Room code copied successfully")

    }

    function copyInviteLink() {

        navigator.clipboard.writeText(inviteLink);

        toast.success("Invite Link Copied");

    }

    return (

        <div className="create-room">
{loading && <Loader />}
            <div className="room-card">

                <h1>Create Secure Room</h1>

                <p>
                    Generate a temporary secure room.
                </p>
                <label>Display Name (Optional)</label>
    <input
    type="text"
    placeholder="Enter your name"
    value={displayName}
    onChange={(e) => setDisplayName(e.target.value)}
/>


  
<div className="range-container">

    <label htmlFor="maxUsers">

        Maximum Participants

    </label>

    <div className="range-value">

        👥 {maxUsers}

    </div>

    <input
        id="maxUsers"
        type="range"
        min="2"
        max="10"
        value={maxUsers}
        onChange={(e) =>
            setMaxUsers(Number(e.target.value))
        }
    />

    <div className="range-labels">

        <span>2</span>

        <span>10</span>

    </div>


</div>
                <button
                    className="generate-btn"
                    onClick={generateRoom}
                    disabled={loading}
                >

                    {
                        loading
                            ? "Generating..."
                            : "Generate Room"
                    }

                </button>

                {

                    roomCode && (

                        <>

                            <div className="room-info">

                                <h3>Room Code</h3>

                                <div className="room-code">

                                    {roomCode}

                                </div>

                            </div>

                            <button
                                className="copy-btn"
                                onClick={copyCode}
                            >

                                Copy Code

                            </button>

                            <button
                                className="copy-btn"
                                onClick={copyInviteLink}
                            >

                                Copy Invite Link

                            </button>

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default CreateRoom;