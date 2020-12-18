'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlanoInstituicao extends Model {
    planoEscolhidoInstituicao(){
        return this.hasOne('./PlanoEscolhidoInstituicao')
    }
    plano(){
        return this.belongsTo('./Plano')
    }
}

module.exports = PlanoInstituicao
