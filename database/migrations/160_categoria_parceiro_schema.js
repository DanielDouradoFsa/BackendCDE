'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaParceiroSchema extends Schema {
  up () {
    this.create('categoria_parceiros', (table) => {
      table.increments('id')
      table.string('categoria_descricao', 50).notNullable()
      table.timestamps()})
  }

  down () {
    this.drop('categoria_parceiros')
  }
}

module.exports = CategoriaParceiroSchema
