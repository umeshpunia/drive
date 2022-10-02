const express = require("express");
const { createFolder } = require("../../controllers/drive/add.folder");
const router = express.Router();
const {
  getFolders,
  getFolder,
  getFolderFiles,
} = require("../../controllers/drive/getFolder");
router.post("/add-folder", createFolder);
router.post("/folders", getFolders);
router.get("/folder/:_id", getFolder);

router.post("/folder-files", getFolderFiles);

module.exports = router;
