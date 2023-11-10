const { request, response } = require("express");
const Plan = require("../models/Plan");

const getPlans = async (req = request, res = response) => {
  const plans = await Plan.find();

  res.json({ plans });
};

const getPlan = async (req = request, res = response) => {
  const { id } = req.params;
  const plan = await Plan.findById(id);

  res.json({ plan });
};

const postPlan = async (req = request, res = response) => {
  const { beneficios, precio, descripcion } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  const plan = new Plan({ nombre, beneficios, precio, descripcion });
  plan.save();
  res.json({ message: "El plan fue agregado exitosamente", plan });
};

const putPlan = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, ...planToUpdate } = req.body;

  if (nombre) {
    planToUpdate.nombre = nombre.toUpperCase();
  }

  const plan = await Plan.findByIdAndUpdate(id, planToUpdate, { new: true });

  res.json({
    message: "El plan fue actualizado exitosamente",
    plan,
  });
};

const deletePlan = async (req = request, res = response) => {
  const { id } = req.params;
  await Plan.findByIdAndDelete(id);

  res.json({ message: "Plan Eliminado Exitosamente" });
};

module.exports = { getPlans, getPlan, postPlan, putPlan, deletePlan };
