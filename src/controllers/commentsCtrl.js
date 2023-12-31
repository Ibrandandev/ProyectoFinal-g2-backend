const { request, response } = require("express");

const Comment = require("../models/Comment");

const getComments = async (req = request, res = response) => {
  const { limit = 0 } = req.query;
  const comments = await Comment.find()
    .populate("usuario", "nombre apellido")
    .limit(limit)
    .sort({ _id: -1 });

  res.json({ comments });
};

const postComment = async (req = request, res = response) => {
  const { comentario } = req.body;
  const { id } = req.user;

  if (!id) {
    res.status(401).json({ message: "Debe Iniciar Sesion!" });
  }

  const comment = new Comment({ comentario, usuario: id });
  await comment.save();

  res.status(200).json({ message: "Exitoso" });
};

module.exports = {
  getComments,
  postComment,
};
