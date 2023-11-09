const { request, response } = require("express");

const Trainer = require("../models/Trainer");

const getTrainers = async (req = request, res = response) => {
  const trainers = await Trainer.find();

  res.json({ trainers });
};

const postTrainer = async (req = request, res = response) => {
  const { nombre, apellido, imagen } = req.body;

  const trainer = new Trainer({ nombre, apellido, imagen });
  await trainer.save();

  res.json({ message: "Profesor Agregado Exitosamente!", trainer });
};

module.exports = {
  getTrainers,
  postTrainer,
};
