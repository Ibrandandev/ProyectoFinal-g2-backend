const { request, response } = require("express");
const Category = require("../models/Category");

const getCategories = async (req = request, res = response) => {
  const categories = await Category.find();

  res.json({ categories });
};

const postCategory = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const category = new Category({ nombre });
  await category.save();

  res.json({ message: "La categoria fue creada exitosamente", category });
};

module.exports = { getCategories, postCategory };
