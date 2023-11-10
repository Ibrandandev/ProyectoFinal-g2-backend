const { Router } = require("express");

const { check } = require("express-validator");

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersCtrl");

const {
  isValidEmail,
  isValidPlan,
  isValidRole,
  isValidId,
} = require("../helpers/db-validators");

const { checkFields } = require("../middlewares/checkFields");

const router = Router();

router.get("/", [], getUsers);

router.get(
  "/:id",
  [check("id", "El id es invalido").isMongoId(), check("id").custom(isValidId)],
  getUser
);

router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").notEmpty(),
    check("apellido", "El Apellido es requerido").notEmpty(),
    check("email", "El Email es requerido").notEmpty(),
    check("email").custom(isValidEmail),
    check(
      "password",
      "La contraseña debe tener 8 caracteres o más, entre ellos Mayuscula, Minuscula, Numero y Simbolo"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    check("planContratado").custom(isValidPlan),
    check("rol", "El rol es requerido").notEmpty(),
    check("rol").custom(isValidRole),
    checkFields,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidId),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("apellido", "El Apellido es requerido").notEmpty(),
    check("email", "El Email es requerido").notEmpty(),
    check("planContratado").custom(isValidPlan),
    checkFields,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "El id es invalido").isMongoId(),
    check("id").custom(isValidId),
    checkFields,
  ],
  deleteUser
);

module.exports = router;
