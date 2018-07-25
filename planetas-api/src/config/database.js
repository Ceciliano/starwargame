import mongoose  from 'mongoose';
import config  from 'config';

mongoose.Promise = global.Promise;

mongoose.Error.messages.general.required="O atributo '{PATH}' é obrigatório.";
mongoose.Error.messages.general.unique="O item '{VALUE}' já está cadastrado.";

export default mongoose.connect(config.URI_MONGODB, { useNewUrlParser: true });
