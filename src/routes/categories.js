const { Router } = require("express");
const { check } = require("express-validator");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRole } = require("../middlewares/checkRoles");
const { checkFields } = require("../middlewares/checkFields");
const {
  getCategories,
  getCategory,
  postCategory,
} = require("../controllers/CategoriesCtrl");

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post(
  "/",
  [
    checkJWT,
    isAdminRole,
    check("nombre", "La categoria es requerida").notEmpty(),
    check("img", "La imagen es requerida").notEmpty(),
    checkFields,
  ],
  postCategory
);

module.exports = router;
