'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlanoEscolhidoParceiro extends Model {
    plano(){
        return this.belongsTo('./Plano')
    }
    parceiro(){
        return this.belongsTo('./Parceiro')
    }
    planoEscolhido(){
        return this.belongsTo('./PlanoEscolhido')
    }
}

module.exports = PlanoEscolhidoParceiro
