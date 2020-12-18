'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlanoEscolhidoInstituicao extends Model {
    planoEscolhido(){
        return this.belongsTo('./PlanoEscolhido')
    }
    instituicao(){
        return this.belongsTo('./Instituicao')
    }
    planoInstituicao(){
        return this.belongsTo('./PlanoInstituicao')
    }
}

module.exports = PlanoEscolhidoInstituicao
