const { Router } = require("express");

const { getTrainers, postTrainer } = require("../controllers/trainersCtrl");

const router = Router();

router.get("/", getTrainers);

router.post("/", postTrainer);

module.exports = router;
