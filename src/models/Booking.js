const { Schema, model } = require("mongoose");

const BookingSchema = Schema({
  usuario: { type: Schema.Types.ObjectId, ref: "User", required: true },
  servicio: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  estado: { type: Boolean, default: true },
});

module.exports = model("Booking", BookingSchema);
