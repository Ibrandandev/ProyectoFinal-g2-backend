const { Schema, model } = require("mongoose");

const PlanSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del plan es requerido"],
    unique: true,
  },
  duracion: {
    type: String,
    required: [true, "La duracion del plan es requerida"],
  },
  precio: { type: Number, required: [true, "EL Precio es requerido"] },
  img: { type: String, required: [true, "La imagen es requerida"] },
  descripcion: { type: String },
  beneficios: { type: Array },
  estado: { type: Boolean, default: true },
});

module.exports = model("Plan", PlanSchema);
