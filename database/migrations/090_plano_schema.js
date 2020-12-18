'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanoSchema extends Schema {
  up () {
    this.create('planos', (table) => {

      table.increments('id')
      table.string('descricao_reduzida', 60).notNullable()
      table.string('descricao_completa', 300).notNullable()
      table.decimal('valor_plano', 10, 2).notNullable()
      table.date('validade_plano')
      table.boolean('plano_status')
      table.timestamps()
    })
  }

  down () {
    this.drop('planos')
  }
}

module.exports = PlanoSchema
