const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.usersPath = "/api/users";
    this.rolesPath = "/api/roles";
    this.authPath = "/api/auth";
    this.categoriesPath = "/api/categories";
    this.bookingsPath = "/api/bookings";
    this.servicesPath = "/api/services";
    this.plansPath = "/api/plans";
    this.trainersPath = "/api/trainers";
    this.commentsPath = "/api/comments";
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
    this.app.use(this.rolesPath, require("../routes/roles"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.categoriesPath, require("../routes/categories"));
    this.app.use(this.servicesPath, require("../routes/services"));
    this.app.use(this.bookingsPath, require("../routes/bookings"));
    this.app.use(this.plansPath, require("../routes/plans"));
    this.app.use(this.trainersPath, require("../routes/trainers"));
    this.app.use(this.commentsPath, require("../routes/comments"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en linea port: ${this.port}`);
    });
  }
}

module.exports = Server;
