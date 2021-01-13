'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments('id')
      table.bigInteger('cep').notNullable()
      table.string('rua', 60).notNullable()
      table.integer('numero').notNullable()
      table.string('complemento', 30).notNullable()
      table.string('bairro', 40).notNullable()
      table.string('uf', 20).notNullable()
      table.string('cidade', 40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
