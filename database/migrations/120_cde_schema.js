'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CdeSchema extends Schema {
  up () {
    this.create('cdes', (table) => {
      table.increments('id')
      
      table.string('razao_social', 100).notNullable()
      table.string('fantasia', 50).notNullable()
      table.bigInteger('cnpj').notNullable()
      

      table.integer('id_endereco').unsigned()
      .references('id')
      .inTable('enderecos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.integer('id_telefone').unsigned()
      .references('id')
      .inTable('telefones')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.integer('id_user').unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.string('email_geral', 60).notNullable()
      table.string('email_parceiros', 60).notNullable()
      table.string('email_instituicoes', 60).notNullable()
      table.string('email_usuarios', 60).notNullable()
      
      table.decimal('percentual_multa', 8, 2).notNullable()
      table.decimal('percentual_juros', 8,2 ).notNullable()
      

      table.timestamps()
    })
  }

  down () {
    this.drop('cdes')
  }
}

module.exports = CdeSchema
