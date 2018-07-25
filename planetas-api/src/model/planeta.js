const mongoose = require('mongoose');

const planetaSchema = new mongoose.Schema({
   nome:{type: String, require: true},
   clima:{type: String, require: true},
   terreno:{type: String, require: true},
   createAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Planeta', planetaSchema)
