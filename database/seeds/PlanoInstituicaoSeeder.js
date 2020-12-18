'use strict'

/*
|--------------------------------------------------------------------------
| PlanoInstituicaoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const PlanoInstituicao = use('App/Models/PlanoInstituicao')
const Plano = use('App/Models/Plano')

class PlanoInstituicaoSeeder {
  async run () {
    
    const plano = await Plano.create({
      descricao_reduzida : "descrição aaaaaa",
      descricao_completa : "descrição  aaaaaaaaaaaaaa",
      valor_plano: 150.00,
      validade_plano: "2020/08/10",
      plano_status: true})

     await PlanoInstituicao.create({
      id_plano : plano.id,
      limite_dependentes: 50
    
  })
}

}

module.exports = PlanoInstituicaoSeeder
