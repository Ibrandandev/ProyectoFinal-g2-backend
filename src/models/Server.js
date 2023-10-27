const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.app.middlewares();
    this.app.routes();
  }
  async connectDb() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {}
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor online en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
