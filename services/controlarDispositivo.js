const { converterEmCodigo } = require("./converterEmCodigo");

function controlarDispositivo(ip, acao, marca, dispositivo) {
  const url = "http://" + ip + ":80";

  fetch(url, {
    method: "POST",
    body: converterEmCodigo(marca, acao, dispositivo),
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

module.exports = controlarDispositivo;
