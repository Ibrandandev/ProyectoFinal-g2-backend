const { Router } = require("express");
const {
  getServices,
  getService,
  postService,
  putService,
  deleteService,
} = require("../controllers/servicesCtrl");

const router = Router();

router.get("/", getServices);
router.get("/", getService);
router.post("/", postService);
router.put("/", putService);
router.delete("/", deleteService);

module.exports = router;
