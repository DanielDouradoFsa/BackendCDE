'use strict'

/*
|--------------------------------------------------------------------------
| PlanoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Plano =  use('App/Models/Plano')

class PlanoSeeder {
  async run () {
    const plano = await Plano.create({
      descricao_reduzida : "descrição nova",
      descricao_completa : "descrição  nova completa",
      valor_plano: 100.00,
      validade_plano: "2020/07/10",
      plano_status: true
    })
  }
}

module.exports = PlanoSeeder
