const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = global.Promise;

mongoose.Error.messages.general.required="O atributo '{PATH}' é obrigatório.";
mongoose.Error.messages.general.unique="O item '{VALUE}' já está cadastrado.";

module.exports = mongoose.connect(config.URI_MONGODB);
