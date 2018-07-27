import chai from 'chai';
import should from 'should';
import database from '../src/config/database';
import * as planetaControllers from '../src/controllers/planetaControllers';
import Planeta from '../src/model/planeta';

describe('Testes Unitários de database de Planetas.', () => {
    const planeta = { nome: 'Naboo', clima: 'Frio', terreno: 'Árido' };

    beforeEach(done => { //Before each test we empty the database
        Planeta.remove({}, err => {
            done();
        });
    });

    afterEach(done => { //Before each test we empty the database
        Planeta.remove({}, err => {
            done();
        });
    });

    describe('Adicionar Planetas', () => {
        it("Deve adicionar um Planeta", done => {
            planetaControllers.add(planeta)
            .then(planeta => {
                planeta.data.should.have.property('nome','Naboo');
                planeta.data.should.have.property('clima','Frio');
                planeta.data.should.have.property('terreno','Árido');
                done();
            }).catch(err => console.log(err));
        });

        it("Deve retornar erro de index de Planetas iguais", done => {
            planetaControllers.add(planeta)
            .then(planeta => {
                console.log(planeta);
                done();
            }).catch(err => console.log(err));
        });

        it("Deve listar os Planetas", done => {
            planetaControllers.planetas()
            .then(planetas => {
                planetas.data.is(['foo', [0, 1]]);
                done();
            }).catch(err => console.log(err));

        });
    });
});
 