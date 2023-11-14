const { Router } = require("express");
const { getRoles } = require("../controllers/rolesCtrl");

const router = Router();

router.get("/", getRoles);

module.exports = router;
