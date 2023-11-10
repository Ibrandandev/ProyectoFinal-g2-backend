const { Schema, model } = require("mongoose");

const TrainerSchema = Schema({
  nombre: { type: String, required: [true, "El nombre es requerido"] },
  apellido: { type: String, required: [true, "El apellido es requerido"] },
  img: { type: String, required: [true, "Foto de perfil requerida"] },
});

module.exports = model("Trainer", TrainerSchema);
