const express = require("express");
const { createUser, getallUsers } = require("../controllers/userControllers");
const router = express.Router()

router.post("/create-user",createUser)
router.get("/",getallUsers)

module.exports = router;