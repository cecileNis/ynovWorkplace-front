const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.send({ response: "I'm alive" }).status(200);
});

module.exports = router;
