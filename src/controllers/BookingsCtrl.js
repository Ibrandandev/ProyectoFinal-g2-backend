const { request, response } = require("express");
const Booking = require("../models/Booking");
const Service = require("../models/Service");

const getBookings = async (req = request, res = response) => {
  const bookings = await Booking.find({ estado: true })
    .populate("usuario", "nombre apellido")
    .populate("servicio", "nombre dias horario ");

  res.json({ bookings });
};

const getBookingsByUser = async (req = request, res = response) => {
  const { id } = req.user;
  if (!id) {
    return res.status(401).json({ message: "Debe Iniciar Sesion" });
  }
  const bookings = await Booking.find({ estado: true, usuario: id })
    .populate("usuario", "nombre apellido")
    .populate("servicio", "nombre dias horario ");

  if (bookings.length === 0) {
    return res.json({ message: "No tiene Reservas Realizadas" });
  }

  return res.json({ bookings });
};

const postBooking = async (req = request, res = response) => {
  const { id } = req.user;
  const { servicio } = req.body;

  if (!id) {
    return res.status(401).json({ message: "Debe Iniciar Sesion" });
  }

  const bookingExist = await Booking.countDocuments({ usuario: id, servicio });

  if (bookingExist) {
    return res.status(400).json({ message: "Ya esta registrado" });
  }

  const service = await Service.findById(servicio);

  if (!service) {
    return res.status(400).json("No se ha encontrado el servicio");
  }

  if (service.cupo === 0) {
    return res.status(400).json({ message: "No hay cupos" });
  }

  const cupo = service.cupo - 1;

  await Service.findByIdAndUpdate(servicio, { cupo }, { new: true });

  const data = { usuario: id, servicio };

  const booking = new Booking(data);

  await booking.save();

  res.json({ message: "Reserva Exitosa", booking });
};

const deleteBooking = async (req = request, res = response) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    res.status(400).json({ message: "Error al Eliminar, intente nuevamente" });
  }

  res.json({ message: "Eliminacion Exitosa", booking });
};

module.exports = { getBookings, getBookingsByUser, postBooking, deleteBooking };
