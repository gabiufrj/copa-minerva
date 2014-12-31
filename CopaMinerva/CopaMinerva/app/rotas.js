// Definição das rotas do app
var Time = require('./models/time');
var Partida = require('./models/partida');

var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'Bem-vindo à api da Copa Minerva!' })
})

// =========================== Times
router.route('/times')
    .get(function (req, res) {
        Time.find(function (error, times) {
            if (error) {
                res.send(error);
            }
            
            res.json(times);
        });
    })
    .post(function (req, res) {
        var time = new Time();
        
        time.nome = req.body.nome;
        time.sigla = req.body.sigla;

        
        var hifenizado = time.nome.trim();
        hifenizado = hifenizado.toLowerCase();
        hifenizado = hifenizado.replace(/ /g, '-');
        time.hifenizado = hifenizado;
        
        time.save(function (error) {
            if (error) {
                res.send(error);
            }
            
            res.json({ result: true, message: 'Time criado!' });
        });
    });

router.route('/times/:nome_hifenizado')
    .get(function (req, res) {
        var temp = req.params.nome_hifenizado;
        if (!!temp) {
            temp = temp.toLowerCase();
        }

        Time.find({ hifenizado: temp }, function (error, time) {
            if (error) {
                res.send(error);
            }
            
            res.send(time);
        });
    })
    .put(function (req, res) {
    })
    .delete(function (req, res) {
        var temp = req.params.nome_hifenizado;
        Time.remove({ hifenizado: temp }, function (error, time) {
            if (error) {
                res.send(error);
            }
        
            res.json({ result: true, message: 'Time ' + temp + ' removido com sucesso' });
        })
    });


// =========================== Partidas
router.route('/partidas')
    .get(function (req, res) {
        Partida.find(function (error, partidas) {
            if (error) {
                res.send(error);
            }
        
            res.json(partidas);
        });
    })
    .post(function (req, res) {
        var partida = new Partida();
    
        partida.matchID = req.body.matchID;
        partida.campeonatoID = req.body.campeonatoID;
        partida.fase = req.body.fase;
        partida.formato = req.body.formato;
        partida.radiant = req.body.radiant;
        partida.dire = req.body.dire;
        partida.vencedor = req.body.vencedor;
        partida.data = req.body.data;
        partida.casters = req.body.casters;
        partida.vods = req.body.vods;

        partida.save(function (error) {
            if (error) {
                res.send(error);
            }
        
            res.json({ result: true, message: 'Partida criada!' });
        });
    })

module.exports = router;