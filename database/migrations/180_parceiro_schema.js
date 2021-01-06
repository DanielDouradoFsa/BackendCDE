'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParceiroSchema extends Schema {
  up () {
    this.create('parceiros', (table) => {

      table.increments('id')
      table.integer('id_entidade').unsigned()
      .references('id')
      .inTable('entidades')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.string('cpf_cnpj', 12).notNullable()
      table.string('nome_responsavel',60).notNullable()
      table.integer('desconto_percentual').notNullable()
      table.string('tipo_pessoa_fj', 1).notNullable()
      table.timestamps()
      
    })
  }

  down () {
    this.drop('parceiros')
  }
}

module.exports = ParceiroSchema
