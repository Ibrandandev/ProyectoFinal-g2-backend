const User = require("../models/User");
const Role = require("../models/Role");
const Plan = require("../models/Plan");
const Category = require("../models/Category");

const isValidEmail = async (email) => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error("El Email ya se encuentra registrado");
  }
};

const isValidId = async (id) => {
  const userExist = await User.findById(id);

  if (!userExist) {
    throw new Error("No se ha encontrado usuario Relacionado");
  }
};

const planExist = async (plan) => {
  const planExist = await Plan.find({ nombre: plan });

  if (planExist) {
    throw new Error("El plan ya se encuentra registrado");
  }
};

const categoryExist = async (category) => {
  const categoryExist = await Category.find({ nombre: category });

  if (categoryExist) {
    throw new Error("La categoria ya se encuentra registrada");
  }
};

const isValidIdCategory = async (id) => {
  const categoryExist = await Category.findById(id);

  if (!categoryExist) {
    throw new Error("No se ha encontrado Categoria Relacionada");
  }
};

const isValidIdPlan = async (id) => {
  const planExist = await Plan.findById(id);

  if (!planExist) {
    throw new Error("No se ha encontrado Plan Relacionado");
  }
};

const isValidPlan = async (nombre) => {
  const planExist = (await Plan.findOne({ nombre })) || nombre === "NO PLAN";

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
  isValidId,
  isValidIdPlan,
  planExist,
  isValidIdCategory,
  categoryExist,
  isValidPlan,
  isValidRole,
};
