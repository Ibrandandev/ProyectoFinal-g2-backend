const { Router } = require("express");
const { check } = require("express-validator");
const { checkJWT } = require("../middlewares/check-jwt");
const { isValidId } = require("../helpers/db-validators");
const { checkFields } = require("../middlewares/checkFields");
const { getComments, postComment } = require("../controllers/commentsCtrl");

const router = Router();

router.get("/", getComments);

router.post(
  "/",
  [
    checkJWT,
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidId),
    checkFields,
  ],
  postComment
);

module.exports = router;
