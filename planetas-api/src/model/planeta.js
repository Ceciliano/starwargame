import mongoose from 'mongoose';

const planetaSchema = new mongoose.Schema({
   nome:{type: String, required: true, unique: true},
   clima:{type: String, required: true},
   terreno:{type: String, required: true},
   createAt: {type: Date, default: Date.now}
})

export default mongoose.model('Planeta', planetaSchema);
