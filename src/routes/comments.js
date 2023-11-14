const { Router } = require("express");
const { check } = require("express-validator");
const { checkJWT } = require("../middlewares/check-jwt");
const { checkFields } = require("../middlewares/checkFields");
const { isValidId } = require("../helpers/db-validators");
const { getComments, postComment } = require("../controllers/commentsCtrl");

const router = Router();

router.get("/", getComments);

router.post("/", [checkJWT], postComment);

module.exports = router;
