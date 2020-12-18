'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CategoriaParceiro extends Model {
    segmentoParceiro(){
        return this.hasOne('./SegmentoParceiro')
    }
}

module.exports = CategoriaParceiro
