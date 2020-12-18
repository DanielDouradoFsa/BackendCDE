'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanoEscolhidoParceiroSchema extends Schema {
  up () {
    this.create('plano_escolhido_parceiros', (table) => {
      table.increments('id')

      table.integer('id_plano_parceiro').unsigned()
      .references('id')
      .inTable('planos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.integer('id_parceiro').unsigned()
      .references('id')
      .inTable('parceiros')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.integer('id_plano_escolhido').unsigned()
      .references('id')
      .inTable('plano_escolhidos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      
      table.timestamps()
    })
  }

  down () {
    this.drop('plano_escolhido_parceiros')
  }
}

module.exports = PlanoEscolhidoParceiroSchema
