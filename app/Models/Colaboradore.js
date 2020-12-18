'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Colaboradore extends Model {
    planoEscolhido(){
        return this.hasOne('./PlanoEscolhido')
    }

    telefone(){
        return this.belongsTo('./Telefone')
    }
    endereco(){
        return this.belongsTo('./Endereco')
    }
    image(){
        return this.hasOne('./Image')
    }
}

module.exports = Colaboradore
