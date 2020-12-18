'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DadosBancariosBoleto extends Model {
    cde(){
        return this.belongsTo('./CDE')
    }

    planoEscolhido(){
        return this.hasOne('./PlanoEscolhido')
    }
}

module.exports = DadosBancariosBoleto
