const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkJWT = async (req = request, res = response, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ message: "Debe Iniciar Sesion" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "El token no es valido, el usuario no existe!" });
    }

    if (!user.usuarioActivo) {
      return res.status(401).json({
        message: "El token no es valido, el usuario esta deshabilitado!",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Debe iniciar Sesion!" });
  }
};

module.exports = { checkJWT };
