const express = require("express");
const { createFolder } = require("../../controllers/drive/add.folder");
const router = express.Router();
const { getFolders } = require("../../controllers/drive/getFolder");
router.post("/add-folder", createFolder);
router.post("/folders", getFolders);

module.exports = router;
