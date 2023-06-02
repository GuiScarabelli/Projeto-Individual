var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

// router.get("/listarPlacar/:filtros", function (req, res) {
//     usuarioController.listarPlacar(req, res);
// });

router.get("/listarPlacar", function (req, res) {
    usuarioController.listarPlacar(req, res);
});


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/jogar", function (req, res){
    usuarioController.jogar(req, res)
})

module.exports = router;