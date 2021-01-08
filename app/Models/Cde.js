'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cde extends Model {
    telefone(){
        return this.belongsTo('./Telefone')
    }
    endereco(){
        return this.belongsTo('./Endereco')
    }
    dadosBancarioBoleto(){
        return this.hasOne('./DadosBancariosBoleto')
    }
    user(){
        return this.belongsTo('./User')
    }
}

module.exports = Cde
