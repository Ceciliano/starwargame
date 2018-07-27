import chai, {expect} from 'chai';
import should from 'should';
import database from '../src/config/database';
import * as planetaControllers from '../src/controllers/planetaControllers';
import Planeta from '../src/model/planeta';

describe('Testes Unitários de database de Planetas.', () => {
    const planeta = { nome: 'Naboo', clima: 'Frio', terreno: 'Árido' };

    const planetaIncompleto = { };

    before(done => { //Before test we empty the database
        Planeta.remove({}, () => {
            done();
        });
    });

    after(done => { //After test we empty the database
        Planeta.remove({}, () => {
            done();
        });
    });

    describe('Adicionar Planetas', () => {
        it("Deve adicionar um Planeta.", done => {
            planetaControllers.add(planeta)
            .then(response => {
                response.data.should.have.property('nome','Naboo');
                response.data.should.have.property('clima','Frio');
                response.data.should.have.property('terreno','Árido');
                done();
            }).catch(err => done(err));
        });

        it("Deve retornar erro de index de Planetas iguais.", done => {
            planetaControllers.add(planeta)
            .then(response => {
                response.data.error.should.have.property('code', 11000);
                done();
            }).catch(err => done(err));
        });

        it("Deve retornar erro campos obrigatorios.", done => {
            planetaControllers.add(planetaIncompleto)
            .then(response => {
                response.data.error.should.have.property('code', 11000);
                done();
            }).catch(err => done(err));
        });
    });

    describe('Consultar Planetas', () => {
        it("Deve listar todos os Planetas.", done => {
            planetaControllers.planetas()
            .then(response => {
                expect(response.data).to.have.lengthOf(1);
                done();
            }).catch(err => done(err));
        });

        it("Deve retorna planeta por nome.", done => {
            planetaControllers.findByName(planeta.nome)
            .then(response => {
                planeta._id = response.data._id;

                response.data.should.have.property('nome','Naboo');
                response.data.should.have.property('clima','Frio');
                response.data.should.have.property('terreno','Árido');
                done();
            }).catch(err => done(err));
        });

        it("Deve retorna planeta por id.", done => {
            planetaControllers.findById(planeta._id)
            .then(response => {
                response.data.should.have.property('nome','Naboo');
                response.data.should.have.property('clima','Frio');
                response.data.should.have.property('terreno','Árido');
                done();
            }).catch(err => done(err));
        });
    });

    describe('Deletar um Planeta', () => {
        it("Deve deletar um Planeta.", done => {
            planetaControllers.remove(planeta._id)
            .then(response => {
                response.data.should.have.property('message','Excluido com sucesso.');
                done();
            }).catch(err => done(err));
        });

        it("Deve erro ao deletar um Planeta inexistente.", done => {
            planetaControllers.remove(planeta._id)
            .then(response => {
                response.data.should.have.property('message','Registro não encontrado.');
                done();
            }).catch(err => done(err));
        });
    });
});
 