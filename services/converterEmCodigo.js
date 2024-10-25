module.exports = function converterEmCodigo(marca, comando, dispositivo) {
  dispositivo = dispositivo == "Projetor" ? 2 : 1;
  marca = marca == "mídia" ? 1 : 2;

  if (comando == "Ligar") {
    comando = 1;
  } else if (comando == "Desligar") {
    comando = 2;
  } else if (comando == "Temperatura 20") {
    comando = 20;
  } else {
    comando = 22;
  }

  return `?${marca}/${dispositivo}/${comando}`;
};
