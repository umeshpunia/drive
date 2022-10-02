const FolderSchema = require("../../models/folder.model");
const fs = require("fs");

const drivePath = "assets/drive/folders";
function createFolder(req, res) {
  const { email, name, parentFolderId } = req.body;

  if (!email || !name)
    return res.status(400).json({ status: 400, msg: "Bad Request" });

  fs.mkdir(drivePath + "/" + email + "/" + name, (err) => {
    if (err) return res.status(500).json({ status: 500, msg: err.message });

    let insFolder = new FolderSchema({
      createdBy: email,
      name,
      parentFolder: parentFolderId,
    });

    insFolder.save((err, data) => {
      if (err) return res.status(501).json({ status: 501, msg: err.message });
      if (!data)
        return res.status(401).json({ status: 401, msg: "Please Try Again" });

      res.status(200).json({ status: 200, msg: "Folder Created Successfully" });
    });
  });
}

module.exports = { createFolder };
