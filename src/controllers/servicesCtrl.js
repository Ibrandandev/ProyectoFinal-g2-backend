const { request, response } = require("express");
const Service = require("../models/Service");

const getServices = async (req = request, res = response) => {
  const services = await Service.find();

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
  const { categoria, profesor, descripcion, fecha, horario, img } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  const data = {
    nombre,
    categoria,
    profesor,
    descripcion,
    fecha,
    horario,
    img,
  };
  const service = new Service(data);
  await service.save();

  res.json({ message: "Servicio creado con exito", service });
};

const putService = async (req = request, res = response) => {
  const { id } = req.params;
  // const { ...serviceToUpdate } = req.body;

  // const service = await Service.findByIdAndUpdate(id, serviceToUpdate, {
  //   new: true,
  // });

  res.json({ message: "Servicio actualizado con exito" });
};

const deleteService = async (req = request, res = response) => {
  const { id } = req.params;

  const service = await Service.findById(id);

  if (!service.estado) {
    return res.json({ message: "El servicio ya esta deshabilitado" });
  }

  const serviceDisabled = await Service.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({ message: "Servicio Desahabilitado con exito", serviceDisabled });
};

module.exports = {
  getServices,
  getService,
  postService,
  putService,
  deleteService,
};
