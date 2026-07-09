 import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import "../style/AdminDashboard.css"
function AdminDashboard() {
// console.log("w")
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const { data } = await api.get(

                "/api/admin/dashboard"

            );

            setDashboard(data.dashboard);

        }

        catch (error) {

            console.log(error);

        }

    }

    if (!dashboard) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="admin-dashboard">
<h1 className="admin-title">
    SecureShare Admin Dashboard
</h1>
<div className="stats-grid">

    <div className="stat-card">
        <h3>Total Users</h3>
        <p>{dashboard.totalUsers}</p>
    </div>

    <div className="stat-card">
        <h3>Total Rooms</h3>
        <p>{dashboard.totalRooms}</p>
    </div>

    <div className="stat-card">
        <h3>Active Rooms</h3>
        <p>{dashboard.activeRooms}</p>
    </div>

    <div className="stat-card">
        <h3>Expired Rooms</h3>
        <p>{dashboard.expiredRooms}</p>
    </div>

    <div className="stat-card">
        <h3>Total Participants</h3>
        <p>{dashboard.totalParticipants}</p>
    </div>

</div>
            <hr />
            <hr />
            <h2 className="room-heading">
                {dashboard.activeRooms>0 ?"Active Rooms":"No  Active Rooms"}
   
</h2>

           
<div className="room-grid">

    {dashboard.rooms.map(room => (

        <div
            className="room-card"
            key={room._id}
        >

            <h3>{room.roomCode}</h3>

            <p>
                <strong>Owner:</strong>{" "}
                {room.owner?.firstName} {room.owner?.lastName}
            </p>

            <p>
                <strong>Maximum Users:</strong> {room.maxUsers}
            </p>

            <p>
                <strong>Joined Users:</strong> {room.totalJoinedUsers}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${room.status}`}>
                    {room.status}
                </span>
            </p>

        </div>

    ))}

</div>
        </div>

    );

}

export default AdminDashboard;