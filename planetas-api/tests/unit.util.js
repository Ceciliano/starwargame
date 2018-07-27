import chai, {expect} from 'chai';
import should from 'should';
import * as planetaUtil from '../src/suport/planetaUtil';

describe('Testes Unitários lib utils.', () => {
    const pessoa = {"nome":"Rafael Braga"};

    it("Deve clonar um objeto.", done => {
        let pessoa2;

        pessoa2 = planetaUtil.clone(pessoa);

        if(pessoa2){
            done();
        } else if(pessoa2.nome == pessoa.nome){
            done();
        } else {
            done("Erro: Objeto não foi clonado");
        }  
        
    });
    

    it("Deve criar um objeto response.", done => {
        let response = planetaUtil.defaultResponse(pessoa);

        if(response.statusCode == 200){
            done();
        } else {
            done("Erro: Objeto Não foi criado");
        }
        
    });

    it("Deve clonar um erro objeto.", done => {
        let response = planetaUtil.errorResponse(pessoa);

        if(response.statusCode == 400){
            done();
        } else {
            done("Erro: Objeto Não foi criado");
        }
        
    });
});