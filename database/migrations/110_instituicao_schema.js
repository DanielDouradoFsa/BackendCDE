'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstituicaoSchema extends Schema {
  up() {
    this.create('instituicaos', (table) => {
      table.increments('id')
      
      table.integer('id_categoria_instituicaos').unsigned()
        .references('id')
        .inTable('categoria_instituicaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      
      table.integer('id_entidade').unsigned()
        .references('id')
        .inTable('entidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');  
       
      table.date('data_primeira_adesao').notNullable()
      
      table.integer('id_responsavel_cargo').unsigned()
        .references('id')
        .inTable('tipo_cargo_responsavels')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
     
      table.integer('max_dependentes').notNullable()
      table.integer('responsavel_fone_ddd').notNullable()
      table.bigInteger('responsavel_fone_numero').notNullable()

      table.timestamps()
    })
  }

  down() {
    this.drop('instituicaos')
  }
}

module.exports = InstituicaoSchema
