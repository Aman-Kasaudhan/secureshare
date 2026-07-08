import { useRef, useState } from "react";
import axios from "axios";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "./Loader";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

function FileUpload({
    roomCode,
    socket
}) {

    const inputRef = useRef(null);

    const [allowDownload, setAllowDownload] = useState(false);
// const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const openFilePicker = () => {

        inputRef.current.click();

    };

    const handleFileSelect = async (e) => {

        const file = e.target.files[0];
        
        if (!file) return;
        
        try {

            setUploading(true);
 
 
            const formData = new FormData();

            formData.append("file", file);

            formData.append("roomCode", roomCode);
            
            formData.append("allowDownload", allowDownload);
            
            // console.log(file)
            const response = await api.post(`/api/files/upload/${roomCode}`,formData,{
                    headers: {

                        "Content-Type":
                            "multipart/form-data"
                    }
                });

            socket.emit(

                "file-uploaded",

                {

                    roomCode,

                    file:

                        response.data.file

                }

            );

        }

        catch (error) {

            // console.log(error);

        }

        finally {

            setUploading(false);

        }

    };

     



    return (

        <>
{uploading && <Loader />}
            <input

                ref={inputRef}

                type="file"

                hidden

                onChange={handleFileSelect}

            />

            <button

                onClick={openFilePicker}

            >

              📎

            </button>

            <label>

                <input

                    type="checkbox"

                    checked={allowDownload}

                    onChange={(e)=>

                        setAllowDownload(

                            e.target.checked

                        )

                    }

                />

                Allow Download

            </label>

        </>

    );

}

export default FileUpload;