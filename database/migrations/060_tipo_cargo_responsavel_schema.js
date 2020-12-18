'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoCargoResponsavelSchema extends Schema {
  up () {
    this.create('tipo_cargo_responsavels', (table) => {
      table.increments('id')
      table.string('descricao_tipo_cargo',40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipo_cargo_responsavels')
  }
}

module.exports = TipoCargoResponsavelSchema
