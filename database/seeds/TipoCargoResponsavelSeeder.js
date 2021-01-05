'use strict'

/*
|--------------------------------------------------------------------------
| TipoCargoResponsavelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const TipoCargoResponsavel = use('App/Models/TipoCargoResponsavel')
class TipoCargoResponsavelSeeder {
  async run () {
    await TipoCargoResponsavel.create({
      descricao_tipo_cargo : "Diretor"
    })
  }
}

module.exports = TipoCargoResponsavelSeeder
