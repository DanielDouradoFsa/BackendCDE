'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntidadeSchema extends Schema {
  up () {
    this.create('entidades', (table) => {
      table.increments('id')

      table.string('razao_social', 100).notNullable()
      table.string('nome_fantasia', 50).notNullable()  
      table.string('responsavel_nome', 100).notNullable()
      table.bigInteger('responsavel_cpf').notNullable()
      table.string('link_site', 100).notNullable()
      table.string('link_facebook', 100).notNullable()
      table.string('link_instagram', 100).notNullable()
      table.string('Perfil', 500).notNullable()

      table.integer('id_telefone').unsigned()
        .references('id')
        .inTable('telefones')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_endereco').unsigned()
        .references('id')
        .inTable('enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_imagem1').unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('id_imagem2').unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
      table.integer('id_imagem3').unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
      table.integer('id_imagem4').unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_imagem5').unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_user').unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps()
    })
  }

  down () {
    this.drop('entidades')
  }
}

module.exports = EntidadeSchema
