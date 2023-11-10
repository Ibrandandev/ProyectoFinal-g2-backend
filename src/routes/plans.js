const { Router } = require("express");
const { check } = require("express-validator");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRole } = require("../middlewares/checkRoles");
const { checkFields } = require("../middlewares/checkFields");
const {
  getPlans,
  getPlan,
  postPlan,
  putPlan,
  deletePlan,
} = require("../controllers/plansCtrl");
const { isValidIdPlan, planExist } = require("../helpers/db-validators");

const router = Router();

router.get("/", getPlans);
router.get("/:id", getPlan);
router.post(
  "/",
  [
    checkJWT,
    isAdminRole,
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre").custom(planExist),
    check("duracion", "La duracion es requerida").notEmpty(),
    check("precio", "El precio es requerido").notEmpty(),
    check("precio", "Debe Ingresar un precio").isNumeric(),
    check("img", "La imagen es requerida").notEmpty(),
    checkFields,
  ],
  postPlan
);
router.put(
  "/:id",
  [
    checkJWT,
    isAdminRole,
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidIdPlan),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("duracion", "La duracion es requerida").notEmpty(),
    check("precio", "El precio es requerido").notEmpty(),
    check("precio", "Debe Ingresar un precio").isNumeric(),
    check("img", "La imagen es requerida").notEmpty(),
    checkFields,
  ],
  putPlan
);
router.delete(
  "/:id",
  [
    checkJWT,
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidIdPlan),
    checkFields,
  ],
  deletePlan
);

module.exports = router;
