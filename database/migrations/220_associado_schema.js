'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssociadoSchema extends Schema {
  up() {
    this.create('associados', (table) => {
      table.increments()
      table.string('nome', 15).notNullable()
      table.string('sobre_nome', 30).notNullable()
      table.string('sexo',1).notNullable()
      table.bigInteger('cpf').notNullable()
      table.bigInteger('DDD_celular').notNullable()
      table.bigInteger('numero_celular').notNullable()
      table.boolean('isDependente').defaultTo(true)

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

      table.integer('id_user').unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_instituicao').unsigned()
        .references('id')
        .inTable('instituicaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      
      table.integer('id_foto').unsigned()
        .references('id')
        .inTable('images')
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
