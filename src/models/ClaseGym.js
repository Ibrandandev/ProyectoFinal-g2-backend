const { Schema, model } = require("mongoose");

const GymClassSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
  },
  profesor: {
    type: String,
    required: [true, "El Profesor es requerido"],
  },
  fecha: {
    type: Date,
    required: [true, "La fecha es requerida"],
  },
  hora: {
    type: String,
    required: [true, "El horario es requerido"],
  },
});

module.exports = model("GymClass", GymClassSchema);
