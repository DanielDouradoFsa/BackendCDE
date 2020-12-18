'use strict'

/*
|--------------------------------------------------------------------------
| CategoriaInstituicaoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const CategoriaInstituicao = use('App/Models/CategoriaInstituicao')

class CategoriaInstituicaoSeeder {
  async run () {
    await CategoriaInstituicao.create({
      descricao_categoria : "Farmácia"
    })
  }
}

module.exports = CategoriaInstituicaoSeeder
