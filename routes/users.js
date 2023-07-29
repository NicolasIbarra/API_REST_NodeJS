const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const data = "Hola, este es el endpoint tipo Get de la ruta Users";
  res.send(data);
});

module.exports = router;
