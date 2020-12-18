'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlanoEscolhido extends Model {
    colaboradore(){
        return this.belongsToMany('./Colaboradore')
    }
    dadosBancariosBoleto(){
        return this.belongsTo('./DadosBancariosBoleto')
    }
    formaPagamento(){
        return this.belongsTo('./FormaPagamento')
    }
    planoEscolhidoInstituicao(){
        return this.hasOne('./PlanoEscolhidoInstituicao')
    }
    planoEscolhidoParceiro(){
        return this.hasOne('./PlanoEscolhidoParceiro')
    }
}

module.exports = PlanoEscolhido
