const { Router } = require("express");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRole } = require("../middlewares/checkRoles");
const { check } = require("express-validator");
const { checkFields } = require("../middlewares/checkFields");
const {
  categoryExist,
  isValidIdCategory,
} = require("../helpers/db-validators");
const {
  getCategories,
  getCategory,
  postCategory,
} = require("../controllers/CategoriesCtrl");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidIdCategory),
    checkFields,
  ],
  getCategory
);

router.post(
  "/",
  [
    checkJWT,
    isAdminRole,
    check("nombre", "La categoria es requerida").notEmpty(),
    check("nombre").custom(categoryExist),
    check("img", "La imagen es requerida").notEmpty(),
    checkFields,
  ],
  postCategory
);

module.exports = router;
