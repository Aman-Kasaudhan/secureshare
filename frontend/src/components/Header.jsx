import "../style/Header.css";
import { useAuth } from "../context/AuthContext";

const { logout } = useAuth();
function Header({

    roomCode,

    users,

    maxUsers,

    timer,

    onLeave

}){

    return(

        <header className="header">

            <div>

                <h2>

                    SecureShare

                </h2>

                <small>

                    Room : {roomCode}

                </small>

            </div>

            <div className="header-center">

                <span>

                    👥 {users}/{maxUsers}

                </span>

                <span>

                    ⏳ {timer}

                </span>

               

            </div>

            <button

                onClick={onLeave}

            >

                Leave Room

            </button>
<button

    onClick={() => {

        logout();

        navigate("/login");

    }}

>

    Logout

</button>
        </header>

    );

}

export default Header;