import mongoose from 'mongoose';

const planetaSchema = new mongoose.Schema({
   nome:{type: String, require: true, unique: true},
   clima:{type: String, require: true},
   terreno:{type: String, require: true},
   createAt: {type: Date, default: Date.now}
})

export default mongoose.model('Planeta', planetaSchema);
