const { request, response } = require("express");

const Role = require("../models/Role");

const getRoles = async (req = request, res = response) => {
  const roles = await Role.find();

  res.json({ roles });
};

module.exports = { getRoles };
