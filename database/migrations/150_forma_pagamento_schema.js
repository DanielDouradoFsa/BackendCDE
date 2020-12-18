'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormaPagamentoSchema extends Schema {
  up () {
    this.create('forma_pagamentos', (table) => {
      table.increments('id')
      table.string('descricao_forma_pagamento', 40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('forma_pagamentos')
  }
}

module.exports = FormaPagamentoSchema
