const mongoose = require("mongoose");
const { Schema } = mongoose;

const Sala = new Schema({
  nome: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  dispositivos: {
    type: [Schema.Types.ObjectId],
    required: false,
    ref: "dispositivos",
  },
});

module.exports = mongoose.model("Sala", Sala);
