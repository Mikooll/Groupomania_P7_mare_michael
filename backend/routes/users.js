const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post("/signup", userCtrl.signup);
// router.post('/login', userCtrl.login);
// router.get("/profile/:id", auth, userCtrl.getProfile);
// router.put("/profile/:id", multer, userCtrl.deleteProfile);

module.exports = router;