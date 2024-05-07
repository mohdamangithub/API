const express = require('express');
const router = express.Router();


const {test, createUser, signIn, signOut, ProfilePage} = require("../controllers/indexController");
const { isAuthenticated } = require('../middlewares/auth');


router.get("/", test)
router.get("/profile", isAuthenticated, ProfilePage)

router.post("/register", createUser)
router.post("/signIn", signIn)
router.get("/signOut", isAuthenticated, signOut)




module.exports = router