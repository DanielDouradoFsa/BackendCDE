'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Image extends Model {
    entidade(){
        return this.hasOne('./Entidade')
    }

    colaboradore(){
        return this.HasOne('./Colaboradore')
    }
    
    colaboradore(){
        return this.hasOne('/.Colaboradore')
    }
}

module.exports = Image
