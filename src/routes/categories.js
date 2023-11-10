const { Router } = require("express");
const {
  getCategories,
  getCategory,
  postCategory,
} = require("../controllers/CategoriesCtrl");

const router = Router();

router.get("/", [], getCategories);

router.get("/:id", [], getCategory);

router.post("/", [], postCategory);

module.exports = router;
