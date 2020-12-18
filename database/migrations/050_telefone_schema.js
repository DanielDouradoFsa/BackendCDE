'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TelefoneSchema extends Schema {
  up () {
    this.create('telefones', (table) => {
      table.increments('id')
      table.integer('fone_fixo_ddd').notNullable()
      table.bigInteger('fone_fixo_numero').notNullable()
      table.integer('celular_ddd').notNullable()
      table.integer('celular_numero').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('telefones')
  }
}

module.exports = TelefoneSchema
