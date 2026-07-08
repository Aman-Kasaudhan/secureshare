import "../style/ParticipantCard.css";

function ParticipantCard({ user }) {

    return (

        <div className="participant-card">

            <div className="left">

                <span
                    className={
                        user.online
                            ? "online-dot"
                            : "offline-dot"
                    }
                ></span>

                <div>

                    <h4>

                        {user.displayName || "Anonymous"}

                    </h4>

                    <small>

                        {

                            user.online

                                ? "Online"

                                : "Offline"

                        }

                    </small>

                </div>

            </div>

            {

                user.isOwner && (

                    <span className="owner">

                        👑

                    </span>

                )

            }

        </div>

    );

}

export default ParticipantCard;