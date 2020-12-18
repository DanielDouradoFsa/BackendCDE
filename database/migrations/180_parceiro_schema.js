'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParceiroSchema extends Schema {
  up () {
    this.create('parceiros', (table) => {

      table.increments('id')
      
      table.integer('id_categoria').unsigned()
      .references('id')
      .inTable('categoria_parceiros')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      
      table.integer('id_segmento').unsigned()
      .references('id')
      .inTable('segmento_parceiros')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      table.timestamps()

      table.integer('id_entidade').unsigned()
      .references('id')
      .inTable('entidades')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.string('cpf_cnpj', 50).notNullable()
      table.integer('apelido_responsavel').notNullable()
      table.integer('desconto_percentual').notNullable()
      table.string('tipo_pessoa_fj', 1).notNullable()
      
      
    })
  }

  down () {
    this.drop('parceiros')
  }
}

module.exports = ParceiroSchema
