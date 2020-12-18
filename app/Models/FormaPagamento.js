'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FormaPagamento extends Model {
    planoEscolhido(){
        return this.hasOne('PlanoEscolhido')
    }
}

module.exports = FormaPagamento
