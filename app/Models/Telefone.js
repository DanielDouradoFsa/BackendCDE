'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Telefone extends Model {
    entidade(){
        return this.hasOne('./Entidade')
    }
    colaboradore(){
        return this.hasOne('/.Colaboradore')
    }
}

module.exports = Telefone
