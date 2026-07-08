import "../style/Loader.css"
// import "./Loader.css";

function Loader() {
    return (
        <div className="loader-overlay">
            <div className="dot-loader">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <p>Please wait...</p>
        </div>
    );
}

export default Loader;