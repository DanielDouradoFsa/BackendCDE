'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Associado extends Model {
    endereco(){
        return this.belongsTo('./Endereco')
    }

    user(){
        return this.belongsTo('./User')
    }
}

module.exports = Associado
