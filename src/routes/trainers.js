const { Router } = require("express");
const { check } = require("express-validator");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRole } = require("../middlewares/checkRoles");
const { checkFields } = require("../middlewares/checkFields");
const { getTrainers, postTrainer } = require("../controllers/trainersCtrl");

const router = Router();

router.get("/", getTrainers);

router.post(
  "/",
  [
    checkJWT,
    isAdminRole,
    check("nombre", "El nombre es requerido").notEmpty(),
    check("apellido", "El apellido es requerido").notEmpty(),
    check("img", "La imagen es requerida").notEmpty(),
    checkFields,
  ],
  postTrainer
);

module.exports = router;
