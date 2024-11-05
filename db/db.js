const dotenv = require("dotenv").config();

if (process.env.NODE_ENV == "production") {
  const DBPassword = process.env.DBpassword;
  const DBUser = process.env.DBuser;

  module.exports = {
    mongoURI: `mongodb+srv://${DBUser}:${DBPassword}@thurssaurus.wma5all.mongodb.net/?retryWrites=true&w=majority&appName=Thurssaurus`,
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/Projeto-IR",
  };
}
