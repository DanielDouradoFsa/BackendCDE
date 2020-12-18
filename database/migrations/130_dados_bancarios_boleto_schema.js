'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DadosBancariosBoletoSchema extends Schema {
  up () {
    this.create('dados_bancarios_boletos', (table) => {
      table.increments('id')

      table.integer('id_cde').unsigned()
      .references('id')
      .inTable('CDEs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

      table.string('banco_descricao', 40).notNullable()
      table.string('numero', 3).notNullable()
      table.string('agencia', 5).notNullable()
      table.string('agencia_digito', 3).notNullable()
      table.string('operacao', 3).notNullable()
      table.string('conta', 20).notNullable()
      table.string('conta_digito', 3).notNullable()
      table.string('convenio', 16).notNullable()
      table.string('layout', 4).notNullable()
      table.string('codigo_cedente', 12).notNullable()
      table.string('pix', 20).notNullable()
    
      table.timestamps()
    })
  }

  down () {
    this.drop('dados_bancarios_boletos')
  }
}

module.exports = DadosBancariosBoletoSchema
