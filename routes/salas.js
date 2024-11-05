const express = require("express");
const Sala = require("../models/Sala");
const Dispositivo = require("../models/Dispositivo");
const router = express.Router();
const controlarDispositivo = require("../services/controlarDispositivo");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Sala.find().then((salas) => {
    res.render("salas/salas", { salas: salas });
  });
});

router.get("/add", async (req, res) => {
  await Sala.find().then((dispositivo) => {
    res.render("salas/addSala", dispositivo);
  });
});

router.post("/add", async (req, res) => {
  const erros = [];

  if (!req.body.ip || typeof req.body.ip == undefined || req.body.ip == null) {
    erros.push({ text: "IP inválido" });
  }
  if (req.body.ip.length < 8) {
    erros.push({ text: "IP muito curto" });
  }

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ text: "Nome inválido" });
  }
  if (req.body.ip.length < 2) {
    erros.push({ text: "Nome muito curto" });
  }

  if (erros.length > 0) {
    res.render("salas/addSala", { erros: erros });
  } else {
    const novaSala = {
      nome: req.body.nome,
      ip: req.body.ip,
    };

    await new Sala(novaSala)
      .save()
      .then(() => {
        req.flash("success_msg", "Sucesso ao cadastrar sala");
        res.redirect("/salas");
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao cadastrar o sala");
        res.redirect("/salas");
      });
  }
});

router.get("/edit/:id", async (req, res) => {
  await Sala.findOne({ _id: req.params.id }).then((sala) => {
    res.render("salas/editsala", sala);
  });
});

router.post("/edit", async (req, res) => {
  const erros = [];

  if (!req.body.ip || typeof req.body.ip == undefined || req.body.ip == null) {
    erros.push({ text: "Endereço de IP inválido" });
  }
  if (req.body.ip.length < 8) {
    erros.push({ text: "Endereço de IP muito curto" });
  }

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ text: "Nome de sala inválido" });
  }
  if (req.body.nome.length < 4) {
    erros.push({ text: "Nome de sala muito curto" });
  }

  if (erros.length > 0) {
    await Sala.findOne({ _id: req.body.id }).then((sala) => {
      res.render("salas/editSala", {
        erros: erros,
        _id: sala._id,
      });
    });
  } else {
    await Sala.findOne({ _id: req.body.id }).then(async (sala) => {
      sala.nome = req.body.nome;
      sala.ip = req.body.ip;

      await sala
        .save()
        .then(() => {
          req.flash("success_msg", "Sucesso ao editar sala");
          res.redirect("/salas");
        })
        .catch((err) => {
          req.flash("error_msg", "Houve um erro interno ao editar o sala");
          res.redirect("/salas");
        });
    });
  }
});

router.post("/deletar", async (req, res) => {
  await Sala.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash("success_msg", "Sucesso ao remover sala");
      res.redirect("/salas");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao remover esta sala");
      res.redirect("/salas");
    });
});

router.get("/gerenciar/:id", async (req, res) => {
  Dispositivo.find().then((dispositivos) => {
    Sala.findById(req.params.id).then(async (sala) => {
      const listaDispositivos = [];

      if (sala.dispositivos !== undefined) {
        await Promise.all(
          sala.dispositivos.map(async (id) => {
            await Dispositivo.findById(id).then((dispositivo) => {
              listaDispositivos.push(dispositivo);
            });
          })
        );
      }
      await res.render("salas/gerenciar", {
        dispositivos: dispositivos,
        _sala: sala,
        dispositivosSala: listaDispositivos,
      });
    });
  });
});

router.post("/addDispositivo/:id", async (req, res) => {
  await Sala.findById(req.params.id).then(async (sala) => {
    sala.dispositivos.push(req.body.dispositivo);
    console.log();
    await sala
      .save()
      .then(() => {
        req.flash("success_msg", "Sucesso ao adicionar dispositivo");
        res.redirect("/salas/gerenciar/" + req.params.id);
      })
      .catch((err) => {
        req.flash(
          "error_msg",
          "Houve um erro interno ao adicionar o dispositivo"
        );
        res.redirect("/salas/gerenciar/" + req.params.id);
      });
  });
});

router.post("/removerDispositivo/:id", async (req, res) => {
  Sala.findById(req.params.id).then(async (sala) => {
    sala.dispositivos = sala.dispositivos.filter((dispositivo) => {
      return req.body.dispositivo !== dispositivo._id.toString();
    });

    await sala
      .save()
      .then(() => {
        req.flash("success_msg", "Sucesso ao remover dispositivo");
        res.redirect("/salas/gerenciar/" + req.params.id);
      })
      .catch((err) => {
        req.flash(
          "error_msg",
          "Houve um erro interno ao remover o dispositivo"
        );
        res.redirect("/salas/gerenciar/" + req.params.id);
      });
  });
});

router.get("/controlar/:id", (req, res) => {
  Sala.findById(req.params.id)
    .populate("dispositivos")
    .then((dispositivos) => {
      res.render("salas/controlar", {
        dispositivos: dispositivos.dispositivos,
        sala_id: req.params.id,
      });
    });
});

router.post("/controlar", (req, res) => {
  Dispositivo.findById(req.params.id).then((dispositivo) => {
    try {
      controlarDispositivo(req.query.id, req.body.acao, dispositivo.marca);
      req.flash("success_msg", "Sucesso ao enviar comando");
      res.redirect("/salas/controlar/" + req.query.sala_id);
    } catch (err) {
      req.flash("error_msg", "Houve um erro interno ao remover o dispositivo");
      res.redirect("/salas/controlar/" + req.query.sala_id);
    }
  });
});

module.exports = router;
