'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instituicao extends Model {
    entidade(){
        return this.belongsTo('./Entidade')
    }

    categoriaInstituicao(){
        return this.belongsTo('./CategoriaInstituicao')
    }

    tipoCargoResponsavel(){
        return this.belongsTo('./TipoCargoResponsavel')
    }
    planoEscolhidoInstituicao(){
        return this.hasOne('./PlanoEsolhidoInstituicao')
    }
}

module.exports = Instituicao
