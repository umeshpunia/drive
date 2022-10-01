const express = require("express");
const { createFolder } = require("../../controllers/drive/add.folder");
const router = express.Router();

router.post("/add-folder", createFolder);

module.exports = router;
