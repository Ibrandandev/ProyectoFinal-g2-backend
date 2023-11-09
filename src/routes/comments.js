const { Router } = require("express");

const { getComments, postComment } = require("../controllers/commentsCtrl");

const router = Router();

router.get("/", getComments);

router.post("/", postComment);

module.exports = router;
