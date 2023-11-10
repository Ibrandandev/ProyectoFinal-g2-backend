const { Schema, model } = require("mongoose");

const ServiceSchema = Schema({
  nombre: { type: String, unique: true },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "La categoria es requerida"],
  },
  profesor: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
    required: [true, "El profesor/a es requerido"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es requerida"],
  },
  fecha: { type: String, required: [true, "El horario es requerido"] },
  horario: { type: String, required: [true, "El horario es requerido"] },
  estado: { type: Boolean, default: true },
  img: { type: String },
});

module.exports = model("Service", ServiceSchema);