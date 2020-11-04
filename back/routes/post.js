const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    id: "sonteve",
    password: "secret",
  });
});

router.post("/posts", (req, res) => {
  console.log(req);
  res.send("니가보낸 데이터");
});

module.exports = router;
