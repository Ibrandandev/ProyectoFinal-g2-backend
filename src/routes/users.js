const { Router } = require("express");

const { check } = require("express-validator");

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersCtrl");

const {
  isValidEmail,
  isValidPlan,
  isValidRole,
} = require("../helpers/db-validators");

const { checkFields } = require("../middlewares/checkFields");

const router = Router();

router.get("/", [], getUsers);

router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").notEmpty(),
    check("apellido", "El Apellido es requerido").notEmpty(),
    check("email", "El Email es requerido").notEmpty(),
    check("email").custom(isValidEmail),
    check("password", "La contraseña es requerida").notEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 8 caracteres"
    ).isLength({ min: 8 }),
    check("planContratado").custom(isValidPlan),
    check("rol", "El rol es requerido").notEmpty(),
    check("rol").custom(isValidRole),
    checkFields,
  ],
  postUser
);

router.put("/:id", [], putUser);

router.delete("/:id", [], deleteUser);

module.exports = router;
