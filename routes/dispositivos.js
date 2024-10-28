const express = require("express");
const router = express.Router();
const Dispositivo = require("../models/Dispositivo");
const Sala = require("../models/Sala");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Dispositivo.find().then((dispositivos) => {
    res.render("dispositivos/Dispositivos", { dispositivos: dispositivos });
  });
});

router.get("/add", (req, res) => {
  res.render("dispositivos/addDispositivo");
});

router.post("/add/novo", (req, res) => {
  const erros = [];

  if (
    !req.body.marca ||
    typeof req.body.marca == undefined ||
    req.body.marca == null
  ) {
    erros.push({ text: "Nome de marca inválido" });
  }
  if (req.body.marca.length < 2) {
    erros.push({ text: "Nome de marca muito curto" });
  }

  if (erros.length > 0) {
    res.render("dispositivos/addDispositivo", { erros: erros });
  } else {
    const novoDispositivo = {
      sala: req.body.sala,
      marca: req.body.marca,
      tipo: req.body.tipo,
    };

    new Dispositivo(novoDispositivo)
      .save()
      .then(() => {
        req.flash("success_msg", "Sucesso ao cadastrar dispositivo");
        res.redirect("/dispositivos");
      })
      .catch((err) => {
        req.flash(
          "error_msg",
          "Houve um erro interno ao cadastrar o dispositivo"
        );
        res.redirect("/dispositivos");
      });
  }
});

router.get("/edit/:id", (req, res) => {
  Dispositivo.findOne({ _id: req.params.id }).then((dispositivo) => {
    res.render("dispositivos/editDispositivo", dispositivo);
  });
});

router.post("/edit", (req, res) => {
  const erros = [];

  if (
    !req.body.marca ||
    typeof req.body.marca == undefined ||
    req.body.marca == null
  ) {
    erros.push({ text: "Nome de marca inválido" });
  }
  if (req.body.marca.length < 2) {
    erros.push({ text: "Nome de marca muito curto" });
  }

  if (erros.length > 0) {
    Dispositivo.findOne({ _id: req.body.id }).then((dispositivo) => {
      res.render("dispositivos/editDispositivo", {
        erros: erros,
        _id: dispositivo._id,
      });
    });
  } else {
    Dispositivo.findOne({ _id: req.body.id }).then((dispositivo) => {
      dispositivo.marca = req.body.marca;
      dispositivo.tipo = req.body.tipo;

      dispositivo
        .save()
        .then(() => {
          req.flash("success_msg", "Sucesso ao editar o dispositivo");
          res.redirect("/dispositivos");
        })
        .catch((err) => {
          req.flash(
            "error_msg",
            "Houve um erro interno ao editar o dispositivo"
          );
          res.redirect("/dispositivos");
        });
    });
  }
});

router.post("/deletar", async (req, res) => {
  await Sala.updateMany(
    {},
    {
      $pull: {
        dispositivos: req.body.id,
      },
    }
  );
  await Dispositivo.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash("success_msg", "Sucesso ao remover dispositivo");
      res.redirect("/dispositivos");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao remover este dispositivo");
      res.redirect("/dispositivos");
    });
});

module.exports = router;
