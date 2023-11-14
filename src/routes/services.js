const { Router } = require("express");
const {
  getServices,
  getService,
  postService,
  putService,
  deleteService,
} = require("../controllers/servicesCtrl");
const { check } = require("express-validator");
const { checkFields } = require("../middlewares/checkFields");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRole } = require("../middlewares/checkRoles");

const router = Router();

router.get("/", [], getServices);
router.get("/:id", [], getService);
router.post(
  "/",
  [
    checkJWT,
    isAdminRole,
    check("nombre", "El nombre es requerido").notEmpty(),
    check("categoria", "La categoria es requerida").notEmpty(),
    check("profesor", "El profesor es requerido").notEmpty(),
    check("descripcion", "La descripcion es requerida").notEmpty(),
    check("dias", "La descripcion es requerida").notEmpty(),
    check("horario", "El horario es requerido").notEmpty(),
    check("img", "La imagen es requerida").notEmpty(),
    check("cupo", "El numero de participantes es requerido").notEmpty(),
    checkFields,
  ],
  postService
);
router.put(
  "/:id",
  [
    checkJWT,
    isAdminRole,
    check("nombre", "El nombre es requerido").notEmpty(),
    check("categoria", "La categoria es requerida").notEmpty(),
    check("profesor", "El profesor es requerido").notEmpty(),
    check("descripcion", "La descripcion es requerida").notEmpty(),
    check("dias", "La descripcion es requerida").notEmpty(),
    check("horario", "El horario es requerido").notEmpty(),
    check("img", "La imagen es requerida").notEmpty(),
    check("cupo", "El numero de participantes es requerido").notEmpty(),
    checkFields,
  ],
  putService
);
router.delete("/:id", [], deleteService);

module.exports = router;
