const { Router } = require("express");
const {
  getCategories,
  postCategory,
} = require("../controllers/CategoriesCtrl");

const router = Router();

router.get("/", getCategories);

router.post("/", postCategory);

module.exports = router;
