'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parceiro extends Model {
    entidade(){
        return this.belongsTo('./Entidade')
    }
    segmentoParceiros(){
        return this.belongsTo('./SegmentoParceiro')
    }
    planoEscolhidoParceiro(){
        return this.hasOne('./PlanoEscolhidoParceiro')
    }
}

module.exports = Parceiro
