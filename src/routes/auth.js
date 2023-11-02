const { Router } = require("express");

const { login } = require("../controllers/authCtrl");
const { check } = require("express-validator");
const { checkFields } = require("../middlewares/checkFields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Debe ingresar su correo").notEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("password", "Debe ingresar su contraseña").notEmpty(),
    checkFields,
  ],
  login
);

module.exports = router;
