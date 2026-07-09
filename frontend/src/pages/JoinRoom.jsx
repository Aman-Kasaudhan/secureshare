import { useState,useEffect } from "react";
import axios from "axios";
import "../style/JoinRoom.css";
import api from "../utils/axiosInstance";
 import { toast } from "react-toastify";
import Loader from "../components/Loader";
// const BASE_URL = import.meta.env.VITE_BASE_URL;
 import { useNavigate,useLocation,useParams } from "react-router-dom";

function JoinRoom() {
    const navigate = useNavigate();
// console.log(location.pathname);
// console.log(useParams());
const { roomCode: urlRoomCode } = useParams();
    const [roomCode, setRoomCode] = useState("");

    const [loading, setLoading] = useState(false);
const [displayName, setDisplayName] = useState("");

useEffect(() => {
        if (urlRoomCode) {
            setRoomCode(urlRoomCode.toUpperCase());
           
        }
    }, [urlRoomCode]);
    async function joinRoom() {
        

        if (!roomCode.trim()) {

            alert("Enter Room Code");

            return;

        }

        try {

            setLoading(true);

            const response = await api.post(
                "/api/rooms/join-room",
                {
                    roomCode,
                    displayName
                }
            );

      navigate(`/room/${response.data.room.roomCode}`);

            // console.log(response.data);
localStorage.setItem(
    `displayName_${roomCode}`,
    displayName
);
            toast.success("Room Joined Successfully");

        }

        catch (error) {

            // console.log(error);

            const message =
         error.response?.data?.message ||
         "Something went wrong";

       toast.error(message);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="join-page">
{loading && <Loader />}

            
            <div className="join-card">

                <h1>Join Secure Room</h1>

                <p>

                    Enter the room code shared with you.

                </p>
            <div className="input-group">

    <label>

        Display Name (Optional)

    </label>

    <input

        type="text"

        placeholder="Enter your name"

        value={displayName}

        maxLength={20}

        onChange={(e)=>

            setDisplayName(e.target.value)

        }

    />

</div>

                <input

                    type="text"

                    placeholder="Enter Room Code"

                    value={roomCode}

                    onChange={(e) =>
                        setRoomCode(
                            e.target.value.toUpperCase()
                        )
                    }

                />

                <button

                    onClick={joinRoom}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Joining..."

                            : "Join Room"

                    }

                </button>

            </div>

        </div>

    );

}

export default JoinRoom;