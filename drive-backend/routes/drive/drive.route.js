const express = require("express");
const { createFolder } = require("../../controllers/drive/add.folder");
const router = express.Router();
const { getFolders, getFolder } = require("../../controllers/drive/getFolder");
router.post("/add-folder", createFolder);
router.post("/folders", getFolders);
router.get("/folder/:_id", getFolder);

module.exports = router;
