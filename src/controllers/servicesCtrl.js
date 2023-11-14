const { request, response, query } = require("express");
const Service = require("../models/Service");

const getServices = async (req = request, res = response) => {
  const { from = 0, limit = 0, category = "" } = req.query;

  let query = {};

  if (category) {
    query = { categoria: category };
  }

  const services = await Service.find(query)
    .populate("categoria", "nombre")
    .populate("profesor", "nombre apellido")
    .skip(from)
    .limit(limit);

  res.json({ services });
};

const getService = async (req = request, res = response) => {
  const { id } = req.params;
  const service = await Service.findById(id)
    .populate("categoria", "nombre")
    .populate("profesor", "nombre apellido");

  res.json({ service });
};

const postService = async (req = request, res = response) => {
  const { categoria, profesor, descripcion, dias, horario, img, cupo } =
    req.body;
  const nombre = req.body.nombre.toUpperCase();
  const data = {
    nombre,
    categoria,
    profesor,
    descripcion,
    dias,
    horario,
    img,
    cupo,
  };
  const service = new Service(data);
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

  const service = await Service.findById(id);

  if (!service.estado) {
    return res.json({ message: "El servicio ya esta deshabilitado" });
  }

  await Service.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json({ message: "Servicio Desahabilitado con exito" });
};

module.exports = {
  getServices,
  getService,
  postService,
  putService,
  deleteService,
};
