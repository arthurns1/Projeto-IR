const mongoose = require("mongoose");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const path = require("path");
const session = require("express-session");
const dispositivos = require("./routes/dispositivos");
const salas = require("./routes/salas");
const dotenv = require("dotenv").config();

//configurações

//seção
app.use(
  session({
    secret: "aplicacao_IFRN",
    resave: true,
    saveUninitialized: true,
  })
);

//Middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
app.use(
  "/services",
  express.static(path.join(__dirname, "services"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Handlebars

app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      estaNaLista: function (dispositivo, array_dispositivo) {
        if (Array.isArray(array_dispositivo))
          return array_dispositivo.includes(dispositivo);
      },
      ehArCondicionado: function (dispositivo) {
        return dispositivo === "Ar condicionado";
      },
      ehProjetor: function (dispositivo) {
        return dispositivo === "Projetor";
      },
    },
  })
);

app.set("view engine", "handlebars");

//Mongoose
const DBPassword = process.env.DBpassword;
const DBUser = process.env.DBuser;
mongoose
  .connect(
    `mongodb+srv://${DBUser}:${DBPassword}@thurssaurus.wma5all.mongodb.net/?retryWrites=true&w=majority&appName=Thurssaurus`
  )
  .then(() => {
    console.log("Sucesso ao conectar com o banco de dados");
  })
  .catch((err) => {
    console.log(`Houve um erro ao conectar-se com o banco: ${err} `);
  });
//Public
app.use(express.static(path.join(__dirname, "public")));

//Rotas

app.get("/", (req, res) => {
  res.render("paginaPrincipal");
});

app.use("/dispositivos", dispositivos);
app.use("/salas", salas);

const PORT = 8081 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Servidor lançado com sucesso");
});
