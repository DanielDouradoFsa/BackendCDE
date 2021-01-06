'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PivoParceiroSegmentoSchema extends Schema {
  up() {
    this.create('pivo_parceiro_segmentos', (table) => {
      table.integer('id_parceiro').unsigned()
        .references('id')
        .inTable('parceiros')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_segmento').unsigned()
        .references('id')
        .inTable('segmento_parceiros')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('pivo_parceiro_segmentos')
  }
}

module.exports = PivoParceiroSegmentoSchema
