'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaInstituicaoSchema extends Schema {
  up () {
    this.create('categoria_instituicaos', (table) => {
      table.increments('id')
      table.string('descricao_categoria',40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('categoria_instituicaos')
  }
}

module.exports = CategoriaInstituicaoSchema
