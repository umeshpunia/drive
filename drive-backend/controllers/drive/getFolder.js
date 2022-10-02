const FolderSchema = require("../../models/folder.model");
const { sendResponse } = require("../../services/sendResponse");

function getFolders(req, res) {
  const { email } = req.body;

  if (!email) return res.json({ status: "400", msg: "Wrong Credentials" });

  FolderSchema.find({ email }, (err, data) => {
    if (err) return sendResponse(res, 500, err.message);
    if (!data) return sendResponse(res, 400, "Please Try Again");
    sendResponse(res, 200, data);
  });
}

function getFolder(req, res) {
  const { _id } = req.params;

  if (!_id) return res.json({ status: "400", msg: "Wrong Credentials" });

  FolderSchema.findOne({ _id }, (err, data) => {
    if (err) return sendResponse(res, 500, err.message);
    if (!data) return sendResponse(res, 400, "Please Try Again");
    sendResponse(res, 200, data);
  });
}

function getFolderFiles(req, res) {
  const { email, id } = req.body;

  if (!id || !email)
    return res.json({ status: "400", msg: "Wrong Credentials" });

  FolderSchema.find({ email, parentFolder: id }, (err, data) => {
    if (err) return sendResponse(res, 500, err.message);
    if (!data) return sendResponse(res, 400, "Please Try Again");
    sendResponse(res, 200, data);
  });
}

module.exports = { getFolders, getFolder, getFolderFiles };
