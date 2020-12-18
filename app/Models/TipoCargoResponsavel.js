'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipoCargoResponsavel extends Model {
    instituicao(){
        return this.hasOne('./Instituicao')
    }
}

module.exports = TipoCargoResponsavel
