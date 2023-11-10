const { request, response } = require("express");
const Category = require("../models/Category");

const getCategories = async (req = request, res = response) => {
  const { from = 0, limit = 0 } = req.query;
  const query = { estado: true };
  const categories = await Category.find(query).skip(from).limit(limit);

  res.json({ categories });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  res.json({ category });
};

const postCategory = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const category = new Category({ nombre });
  await category.save();

  res.json({ message: "La categoria fue creada exitosamente", category });
};

module.exports = { getCategories, getCategory, postCategory };
