const { Schema, model } = require("mongoose");

const PlanSchema = Schema({
  plan: { type: String, required: [true, "El nombre del plan es requerido"] },
});

module.exports = model("Plan", PlanSchema);
