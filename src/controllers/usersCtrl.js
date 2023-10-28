const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = (req = request, res = response) => {
  res.json({ message: "Get users" });
};

const postUser = async (req = request, res = response) => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    planContratado,
    password,
    imagen,
    rol,
  } = req.body;

  const user = new User({
    nombre,
    apellido,
    email,
    telefono,
    planContratado,
    password,
    imagen,
    rol,
  });

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({ message: "Usuario Creado exitosamente", user });
};

const putUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ message: "Put user" });
};

const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ message: "Delete user" });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
