'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanoEscolhidoInstituicaoSchema extends Schema {
  up() {
    this.create('plano_escolhido_instituicaos', (table) => {
      table.increments('id')

      table.integer('id_plano_instituicao').unsigned()
        .references('id')
        .inTable('plano_instituicaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.integer('id_instituicao').unsigned()
        .references('id')
        .inTable('instituicaos')
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

  down() {
    this.drop('plano_escolhido_instituicaos')
  }
}

module.exports = PlanoEscolhidoInstituicaoSchema
