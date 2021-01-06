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
const CategoriaParceiro =  use('App/Models/CategoriaParceiro')

class SegmentoParceiroSeeder {
  async run () {
    const categoriaParceiro = await CategoriaParceiro.create({
      categoria_descricao : "Mercado atacadista"
    })
    await SegmentoParceiro.create({
      segmento_descricao : "Frigorifíco",
      id_categoria:categoriaParceiro.id
    })
  }
}

module.exports = SegmentoParceiroSeeder
