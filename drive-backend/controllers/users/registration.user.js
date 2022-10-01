const UserSchema = require("../../models/user.model");
const bcrypt = require("bcrypt");
const multer = require("multer");

// file uploading
const imgPath = "./assets/images/users";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage }).single("picture");

function registeration(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ msg: err instanceof multer.MulterError });
    } else if (err) {
      return res.status(500).json({ msg: err.message });
      // An unknown error occurred when uploading.
    }

    const { email, password, mobile, username, name } = req.body;
    const picture = req.file.filename;

    if (!name || !email || !password || !mobile || !username) {
      return res.status(400).json({ msg: "Please Fill All Fields" });
    }

    // hash password
    bcrypt.hash(password, 12, (err, hashPass) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (!hashPass) return res.status(400).json({ msg: "Please Try Again" });

      let insUser = new UserSchema({
        email,
        password: hashPass,
        mobile,
        username,
        name,
        picture,
      });

      insUser.save((err, data) => {
        if (err) return res.status(500).json({ msg: err.message });
        if (!data) return res.status(400).json({ msg: "Please Try Again" });
        return res.status(200).json({ msg: "Registration Successfully" });
      });
    });
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }

  // match user
  UserSchema.findOne({ email }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(400).json({ msg: "Please Try Again" });
    let dbPass = data.password;

    bcrypt.compare(password, dbPass, (err, valid) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (!valid) return res.status(400).json({ msg: "Please Try Again" });
      return res.status(200).json({ msg: "Login Successfully" });
    });
  });
}

module.exports = { registeration, login };
