const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.usersPath = "/api/users";
    this.port = process.env.PORT;

    this.connectDb();
    this.middlewares();
    this.routes();
  }
  async connectDb() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en linea port: ${this.port}`);
    });
  }
}

module.exports = Server;
