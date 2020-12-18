'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SegmentoParceiroSchema extends Schema {
  up () {
    this.create('segmento_parceiros', (table) => {
      table.increments('id')
      table.integer('id_categoria').unsigned()
        .references('id')
        .inTable('categoria_parceiros')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.string('segmento_descricao', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('segmento_parceiros')
  }
}

module.exports = SegmentoParceiroSchema
