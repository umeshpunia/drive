const express = require("express");
const {
  registeration,
  login,
} = require("../controllers/users/registration.user");

const {
  forget,
  matchToken,
  reset,
} = require("../controllers/users/forget.password");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey");
});

router.post("/register", registeration);
router.post("/login", login);
router.post("/forget-password", forget);
router.post("/match-token", matchToken);
router.post("/reset", reset);

module.exports = router;
