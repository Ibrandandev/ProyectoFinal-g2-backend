const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: { type: String, required: [true, "El nombre es requerido"] },
  apellido: { type: String, required: [true, "El apellido es requerido"] },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true,
  },
  telefono: { type: String },
  planContratado: { type: String },
  password: { type: String, required: [true, "La contraseña es requerida"] },
  rol: {
    type: String,
    required: true,
  },
  usuarioActivo: { type: Boolean, default: true },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();

  return user;
};

module.exports = model("User", UserSchema);
