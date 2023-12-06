const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { from = 0, limit = 0 } = req.query;

  const [users, total] = await Promise.all([
    User.find().skip(from).limit(limit),
    User.countDocuments(),
  ]);

  res.json({ users, total });
};

const getUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.json({ user });
};

const postUser = async (req = request, res = response) => {
  const { nombre, apellido, email, telefono, planContratado, password, rol } =
    req.body;

  const user = new User({
    nombre,
    apellido,
    email,
    telefono,
    planContratado,
    password,
    rol,
  });

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({ message: "Usuario Creado exitosamente", user });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, ...userToUpdate } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    userToUpdate.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userToUpdate, { new: true });

  res.json({ message: "Usuario Actualizado Correctamente", user });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const adminUser = req.user;

  const user = await User.findById(id);

  if (!user.usuarioActivo) {
    return res.json({ message: "El usuario esta deshabilitado" });
  }

  const userDisabled = await User.findByIdAndUpdate(
    id,
    { usuarioActivo: false },
    { new: true }
  );

  res.json({
    message: "Usuario deshabilitado correctamente",
    userDisabled,
    adminUser,
  });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
