const router = require("express").Router();
const { example } = require("../controllers");

// Todo Add protected routes

// Routes
router.get("/", example.findAllExample);
router.get("/:id", example.findOneExample);

router.post("/", example.createExample);

router.put("/:id", example.updateExample);

router.delete("/:id", example.deleteExample);

module.exports = router;
