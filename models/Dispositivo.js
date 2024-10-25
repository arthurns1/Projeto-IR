const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dispositivo = new Schema({
  sala: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dispositivos", Dispositivo);
