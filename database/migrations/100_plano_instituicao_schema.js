'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanoInstituicaoSchema extends Schema {
  up () {
    this.create('plano_instituicaos', (table) => {
      table.increments('id')
     
      table.integer('id_plano').unsigned()
      .references('id')
      .inTable('planos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.integer('limite_dependentes').notNullable()
     
      table.timestamps()
    })
  }

  down () {
    this.drop('plano_instituicaos')
  }
}

module.exports = PlanoInstituicaoSchema
