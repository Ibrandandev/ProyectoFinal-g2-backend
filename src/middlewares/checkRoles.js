const { request, response } = require("express");

const isAdminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({ message: "Token no validado" });
  }

  const { rol } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({ message: `No esta autorizado!` });
  }

  next();
};

module.exports = { isAdminRole };
