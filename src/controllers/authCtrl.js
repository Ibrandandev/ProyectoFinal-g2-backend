const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generatingJWT } = require("../helpers/generating-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Correo o Password Incorrectos" });
    }

    if (!user.usuarioActivo) {
      return res.status(400).json({ message: "Su cuenta esta deshabilitada" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Correo o Password Incorrectos" });
    }

    const token = await generatingJWT(user._id);

    res.json({ message: "Login OK!", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { login };
