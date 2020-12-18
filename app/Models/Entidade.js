'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entidade extends Model {
    image(){
        return this.belongsToMany('./Image')
    }

    endereco(){
        return this.belongsTo('./Endereco')
    }

    telefone(){
        return this.belongsTo('./Telefone')
    }

    user(){
        return this.belongsTo('./User')
    }

    parceiro(){
        return this.hasOne('./Parceiro')
    }

    instituicao(){
        return this.hasOne('./Instituicao')
    }
}

module.exports = Entidade
