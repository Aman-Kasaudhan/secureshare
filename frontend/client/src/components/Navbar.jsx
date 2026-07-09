import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../style/Navbar.css";
import logo from "../../public/icon.png"
function Navbar() {
const isAdmin =
        localStorage.getItem("admin") === "true";

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    function handleLogout() {
toast.success("Logout successfully")
        logout();
        localStorage.removeItem("admin");

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <div
    className="logo"
    onClick={() => navigate("/")}
>

    <div className="logo-circle">
        <img
            src={logo}
            alt="SecureShare Logo"
        />
    </div>

    <span>SecureShare</span>

</div>

            <div className="nav-links">

                <Link to="/">

                    Home

                </Link>

                {

                    user && (

                        <Link to="/create-room">

                            Create Room

                        </Link>

                    )

                }

                <Link to="/join-room">

                    Join Room

                </Link>

                
                {

                    isAdmin && (

                        <Link to="/admin">

                            Admin Dashboard

                        </Link>

                    )

                }

            </div>

            <div className="nav-right">

                {

                    user

                    ?

                    <>

                        <div className="profile">

                            {

                                user.image

                                ?

                                <img

                                    src={user.image}

                                    alt="profile"

                                />

                                :

                                <div className="avatar">

                                    {

                                        user.firstName[0]

                                    }

                                </div>

                            }

                            <span>

                                {

                                    user.firstName

                                }

                            </span>

                        </div>

                        <button

                            onClick={handleLogout}

                        >

                            Logout

                        </button>

                    </>

                    :

                    <>

                        <Link to="/login">

                            Login

                        </Link>

                        <Link to="/signup">

                            Signup

                        </Link>

                    </>

                }

            </div>

        </nav>

    );

}

export default Navbar;