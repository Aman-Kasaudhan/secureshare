import { useNavigate } from "react-router-dom";
import "../style/Home.css";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home">

            <div className="container">

                <h1>SecureShare</h1>

                <p className="subtitle">
                    Secure Temporary File Sharing &
                    Private Communication
                </p>

                <div className="buttons">

                    <button
                        className="create-btn"
                        onClick={() => navigate("/create-room")}
                    >
                        Generate Secure Room
                    </button>

                    <button className="join-btn" onClick={() => navigate("/join-room")}>
                        Join Existing Room
                    </button>

                </div>

                <div className="features">

                    <div className="feature">
                        🔒 No Login Required
                    </div>

                    <div className="feature">
                        📁 Secure File Sharing
                    </div>

                    <div className="feature">
                        💬 Temporary Chat
                    </div>

                    <div className="feature">
                        ⏳ Auto Delete
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;