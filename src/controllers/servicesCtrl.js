const { request, response } = require("express");
const Service = require("../models/Service");

const getServices = async (req = request, res = response) => {
  const services = await Service.find();

  res.json({ services });
};

const getService = async (req = request, res = response) => {
  const { id } = req.params;
  const service = await Service.findById(id);

  res.json({ service });
};

const postService = async (req = request, res = response) => {
  const {} = req.body;
  const service = new Service();
  await service.save();

  res.json({ message: "Servicio creado con exito", service });
};

const putService = async (req = request, res = response) => {
  const { id } = req.params;
  const { ...serviceToUpdate } = req.body;

  const service = await Service.findByIdAndUpdate(id, serviceToUpdate, {
    new: true,
  });

  res.json({ message: "Servicio actualizado con exito", service });
};

const deleteService = async (req = request, res = response) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);

  res.json({ message: "Servicio eliminado con exito" });
};

module.exports = {
  getServices,
  getService,
  postService,
  putService,
  deleteService,
};
