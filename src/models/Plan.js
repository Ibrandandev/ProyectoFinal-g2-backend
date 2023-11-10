const { Schema, model } = require("mongoose");

const PlanSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del plan es requerido"],
    unique: true,
  },
  beneficios: { type: Array },
  precio: { type: Number, required: [true, "EL Precio es requerido"] },
  descripcion: { type: String },
});

module.exports = model("Plan", PlanSchema);
