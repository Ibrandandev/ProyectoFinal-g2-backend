const { Router } = require("express");
const {
  getBookings,
  getBookingsByUser,
  postBooking,
  deleteBooking,
} = require("../controllers/BookingsCtrl");

const router = Router();

router.get("", [], getBookings);
router.get("", [], getBookingsByUser);
router.post("", [], postBooking);
router.delete("", [], deleteBooking);

module.exports = router;
