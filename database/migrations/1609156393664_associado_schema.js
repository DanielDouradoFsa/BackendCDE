'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssociadoSchema extends Schema {
  up() {
    this.create('associados', (table) => {
      table.increments()
      table.string('nome',60).notNullable()
      table.integer('id_endereco').unsigned()
        .references('id')
        .inTable('enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('id_associado').unsigned()
        .references('id')
        .inTable('associados')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('id_instituicao').unsigned()
        .references('id')
        .inTable('instituicaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down() {
    this.drop('associados')
  }
}

module.exports = AssociadoSchema
