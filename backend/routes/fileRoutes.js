 const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {

    uploadFile,downloadFile,

    previewFile

} = require("../controllers/fileController");

router.post(

    "/upload/:roomCode",

    upload.single("file"),

    uploadFile

);

router.get("/preview/:roomCode/:fileId", previewFile);
router.get("/download/:roomCode/:fileId", downloadFile);

module.exports = router;