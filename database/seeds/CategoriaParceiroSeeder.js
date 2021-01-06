'use strict'

/*
|--------------------------------------------------------------------------
| CategoriaParceiroSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const CategoriaParceiro =  use('App/Models/CategoriaParceiro')

class CategoriaParceiroSeeder {
  async run () {
   await CategoriaParceiro.create({
      categoria_descricao : "Mercadinho"
    })
  }
}

module.exports = CategoriaParceiroSeeder
