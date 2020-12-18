'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Plano extends Model {
    planoEscolhidoParceiro(){
        return this.hasOne('./PlanoEscolhidoParceiro')
    }
    
    planoInstituicao(){
        return this.hasOne('./PlanoInstituicao')
    }
}

module.exports = Plano
