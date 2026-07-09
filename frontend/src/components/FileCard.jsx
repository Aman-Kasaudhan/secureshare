import "../style/FileCard.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function FileCard({ file }) {
// console.log(file.id)
    const preview = () => {

        window.open(

            `${BASE_URL}/api/files/preview/${file.roomCode}/${file.id}`,

            "_blank"

        );

    };

    const download = () => {

        window.open(

            `${BASE_URL}/api/files/download/${file.roomCode}/${file.id}`,

            "_blank"

        );

    };

    const getIcon = () => {

        if (file.mimeType.startsWith("image"))

            return "🖼️";

        if (file.mimeType.startsWith("video"))

            return "🎥";

        if (file.mimeType === "application/pdf")

            return "📕";

        if (file.mimeType.includes("zip"))

            return "📦";

        return "📄";

    };

    const formatSize = (bytes) => {

        if (bytes < 1024)

            return `${bytes} B`;

        if (bytes < 1024 * 1024)

            return `${(bytes / 1024).toFixed(1)} KB`;

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    };

    return (

        <div className="file-card">

            <div className="file-header">

                <span className="file-icon">

                    {getIcon()}

                </span>

                <div>

                    <h4>

                        {file.originalName}

                    </h4>

                    <small>

                        {formatSize(file.size)}

                    </small>

                </div>

            </div>

            <div className="file-actions">

                <button onClick={preview}>

                    Preview

                </button>

                {

                    file.permission.allowDownload &&

                    <button onClick={download}>

                        Download

                    </button>

                }

            </div>

        </div>

    );

}

export default FileCard;