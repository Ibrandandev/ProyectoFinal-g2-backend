const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  nombre: {
    type: String,
    required: [true, "La categoria es requerida"],
  },
  estado: { type: Boolean, default: true },
});

module.exports = model("Category", CategorySchema);
