'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SegmentoParceiro extends Model {
    categoriaParceiro(){
        return this.belongsTo('./CategoriaParceiro')
    }
    parceiro(){
        return this.hasOne('./Parceiro')
    }
}

module.exports = SegmentoParceiro
