const { Router } = require("express");
const {
  getPlans,
  getPlan,
  postPlan,
  putPlan,
  deletePlan,
} = require("../controllers/plansCtrl");

const router = Router();

router.get("/", [], getPlans);
router.get("/:id", [], getPlan);
router.post("/", [], postPlan);
router.put("/:id", [], putPlan);
router.delete("/:id", [], deletePlan);

module.exports = router;
