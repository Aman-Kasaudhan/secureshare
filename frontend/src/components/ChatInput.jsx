import { useRef, useState } from "react";
import api from "../utils/axiosInstance";
import Loader from "./Loader";

function ChatInput({ roomCode, socket, message, setMessage, sendMessage, handleKeyDown, typingTimeout }) {
  const inputRef = useRef(null);
  const [allowDownload,setAllowDownload]=useState(false);
  const [uploading,setUploading]=useState(false);

  const openFilePicker=()=>inputRef.current?.click();

  const handleFileSelect=async(e)=>{
    const file=e.target.files[0];
    if(!file) return;
    try{
      setUploading(true);
      const formData=new FormData();
      formData.append("file",file);
      formData.append("roomCode",roomCode);
      formData.append("allowDownload",allowDownload);

      const {data}=await api.post(`/api/files/upload/${roomCode}`,formData,{
        headers:{"Content-Type":"multipart/form-data"}
      });

      socket.emit("file-uploaded",{roomCode,file:data.file});
    }finally{
      setUploading(false);
      e.target.value="";
    }
  };

  return (
    <>
      {uploading && <Loader />}
      <div className="message-box">
        <input ref={inputRef} type="file" hidden onChange={handleFileSelect} />

        <button type="button" className="attach-btn" onClick={openFilePicker}>📎</button>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e)=>{
            setMessage(e.target.value);
            socket.emit("typing",{roomCode,displayName:"Anonymous"});
            clearTimeout(typingTimeout.current);
            typingTimeout.current=setTimeout(()=>{
              socket.emit("stop-typing",{roomCode});
            },1000);
          }}
          onKeyDown={handleKeyDown}
        />

        <button className="send-btn" onClick={sendMessage}>Send</button>
      </div>

      <label className="download-checkbox">
        <input
          type="checkbox"
          checked={allowDownload}
          onChange={(e)=>setAllowDownload(e.target.checked)}
        />
        Allow Download
      </label>
    </>
  );
}

export default ChatInput;
