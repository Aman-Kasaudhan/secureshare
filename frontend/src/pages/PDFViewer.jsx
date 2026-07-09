import { useParams } from "react-router-dom";

import { Document, Page } from "react-pdf";

import { useState,useEffect } from "react";

import "../style/PDFViewer.css";

function PDFViewer(){

const{roomCode,fileId }=useParams();

const[numPages,setNumPages]=useState();

useEffect(()=>{

const prevent=(e)=>{e.preventDefault();};

document.addEventListener("contextmenu",prevent);

return()=>{document.removeEventListener("contextmenu",prevent);};

const blockKeys=(e)=>{

if(e.ctrlKey &&(e.key==="s"||e.key==="p")){
e.preventDefault();
}

};

document.addEventListener("keydown",blockKeys);

return()=>{

document.removeEventListener("keydown",blockKeys);

};
},[]);

function onLoadSuccess({

numPages

}){

setNumPages(numPages);

}

const pdfURL=

`${import.meta.env.VITE_BASE_URL}/files/preview/${roomCode}/${fileId}`;

return(

<div className="pdf-container">

<div className="top-bar">

<h2>Secure Document Viewer</h2>

<button onClick={()=>window.print()}>Print</button>

</div>

<Document

file={pdfURL}  onLoadSuccess={onLoadSuccess}>

{

Array.from(

new Array(numPages),

(_,index)=>(

<Page

key={index}

pageNumber={index+1}

/>

)

)

}

</Document>

</div>

);

}

export default PDFViewer;