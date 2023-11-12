const { request, response } = require("express");

const Comment = require("../models/Comment");

const getComments = async (req = request, res = response) => {
  const { limit = 0 } = req.query;
  const comments = await Comment.find().limit(limit).sort({ _id: -1 });

  res.json({ comments });
};

const postComment = async (req = request, res = response) => {
  const { comentario } = req.body;
  const { id } = req.user;

  if (!id) {
    res.status(401).json({ message: "Debe Iniciar Sesion!" });
  }

  const comment = new Comment({ comentario });
  await comment.save();

  res.status(200).json({ message: "Comentario Agregado Exitosamente!", id });
};

module.exports = {
  getComments,
  postComment,
};
