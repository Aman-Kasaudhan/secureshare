 import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const { data } = await api.get(

                "/admin/dashboard"

            );

            setDashboard(data.dashboard);

        }

        catch (error) {

            // console.log(error);

        }

    }

    if (!dashboard) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1>Admin Dashboard</h1>

            <h2>Total Users : {dashboard.totalUsers}</h2>

            <h2>Total Rooms : {dashboard.totalRooms}</h2>

            <h2>Active Rooms : {dashboard.activeRooms}</h2>

            <h2>Expired Rooms : {dashboard.expiredRooms}</h2>

            <h2>Total Participants : {dashboard.totalParticipants}</h2>

            <hr />

            {

                dashboard.rooms.map((room) => (

                    <div
                        key={room._id}
                        style={{
                            border: "1px solid #ccc",
                            marginBottom: "15px",
                            padding: "10px"
                        }}
                    >

                        <h3>

                            {room.roomCode}

                        </h3>

                        <p>

                            Owner :

                            {

                                room.owner?.firstName

                            }{" "}

                            {

                                room.owner?.lastName

                            }

                        </p>

                        <p>

                            Max Users :

                            {room.maxUsers}

                        </p>

                        <p>

                            Joined :

                            {room.totalJoinedUsers}

                        </p>

                        <p>

                            Status :

                            {room.status}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default AdminDashboard;