import "../style/Sidebar.css";

function Sidebar({

    participants,

    files

}){

    return(

        <div className="sidebar">

            <h3>

                Participants

            </h3>

            {

                participants.map((user)=>(

                    <div

                        key={user.socketId}

                        className="user"

                    >

                        {user.displayName}

                    </div>

                ))

            }

            <hr/>

            <h3>

                Shared Files

            </h3>

            {

                files.map((file)=>(

                    <div key={file.id} className="shared-file">
                        📄 {file.originalName}

                    </div>

                ))

            }

        </div>

    );

}

export default Sidebar;