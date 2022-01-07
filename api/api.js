var express = require("express");
var router = express.Router();

//usernameValidate
var userController = require("../api/controllers/UserController");
//registro usuario


const pug = require("pug");

router.get("/", function (req, res) {
  res.send(pug.renderFile(__dirname + "/../public/apidoc/api-index.pug"));
});

//acceso publico al servicio
router.get("/usernameValidate/:username", userController.usernameValidate);
router.post("/signup", userController.signup);

router.get("/*", function (req, res, err) {
  res.status(400).send({ message: "Servicio invalido" });
});

//alta de usuarios

module.exports = router;
