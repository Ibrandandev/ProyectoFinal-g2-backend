const { Schema, model } = require("mongoose");

const CommentSchema = Schema({
  usuario: { type: Schema.Types.ObjectId, ref: "User" },
  comentario: { type: String, required: [true, "Debe ingresar un comentario"] },
});

module.exports = model("Comment", CommentSchema);
