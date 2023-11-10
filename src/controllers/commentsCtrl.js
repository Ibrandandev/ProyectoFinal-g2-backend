const { request, response } = require("express");

const Comment = require("../models/Comment");

const getComments = async (req = request, res = response) => {
  const { from = 0, limit = 0 } = req.query;
  const comments = await Comment.find().skip(from).limit(limit);

  res.json({ comments });
};

const postComment = async (req = request, res = response) => {
  const { comentario } = req.body;
  // const usuario = req.user._id;
  const comment = new Comment({ comentario });
  await comment.save();

  res.json({ message: "Comentario Agregado Exitosamente!", comment });
};

module.exports = {
  getComments,
  postComment,
};
