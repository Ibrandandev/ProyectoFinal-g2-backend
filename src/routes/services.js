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
router.get("/:id", getService);
router.post("/", postService);
router.put("/:id", putService);
router.delete("/:id", deleteService);

module.exports = router;
