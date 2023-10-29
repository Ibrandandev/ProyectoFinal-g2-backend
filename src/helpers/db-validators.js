const User = require("../models/User");
const Plan = require("../models/Plan");
const Role = require("../models/Role");

const isValidEmail = async (email) => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error("El Email ya se encuentra registrado");
  }
};

const isValidPlan = async (plan) => {
  const planExist = await Plan.findOne({ plan });

  if (!planExist) {
    throw new Error("El plan no se encuentra registrado");
  }
};

const isValidRole = async (rol) => {
  const roleExist = await Role.findOne({ rol });

  if (!roleExist) {
    throw new Error("El rol no es valido");
  }
};

module.exports = {
  isValidEmail,
  isValidPlan,
  isValidRole,
};
