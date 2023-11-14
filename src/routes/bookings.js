const { Router } = require("express");
const {
  getBookings,
  getBookingsByUser,
  postBooking,
  deleteBooking,
} = require("../controllers/BookingsCtrl");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRole } = require("../middlewares/checkRoles");
const { checkFields } = require("../middlewares/checkFields");
const { check } = require("express-validator");

const router = Router();

router.get("/", [checkJWT, isAdminRole], getBookings);
router.get("/:user", [checkJWT], getBookingsByUser);
router.post(
  "/",
  [checkJWT, check("servicio", "El servicio es requerido"), checkFields],
  postBooking
);
router.delete("/:id", [checkJWT], deleteBooking);

module.exports = router;
