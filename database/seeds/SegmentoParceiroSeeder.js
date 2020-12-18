'use strict'

/*
|--------------------------------------------------------------------------
| SegmentoParceiroSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const SegmentoParceiro = use('App/Models/SegmentoParceiro')

class SegmentoParceiroSeeder {
  async run () {
    await SegmentoParceiro.create({
      segmento_descricao : "Farmácia de Manipulação"
    })
  }
}

module.exports = SegmentoParceiroSeeder
