var mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
    nome: String,
    sigla: String,
    capitao: String,
    membros: [String],
    hifenizado: String // para ter urls bonitinhas
});

var Time = mongoose.model('Time', timeSchema);

module.exports = Time;