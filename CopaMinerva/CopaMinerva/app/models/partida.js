var mongoose = require('mongoose');

var partidaSchema = new mongoose.Schema({
    matchID: Number,
    campeonatoID: Number,
    fase: Number,
    formato: String, // Partida única, BO3, BO5, ...
    radiant: String,
    dire: String,
    vencedor: String,
    data: Date,
    casters: [String],
    vods: [String]
});

var Partida = mongoose.model('Partida', partidaSchema);

module.exports = Partida;