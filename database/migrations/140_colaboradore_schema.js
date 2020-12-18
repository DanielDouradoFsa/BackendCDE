'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ColaboradoreSchema extends Schema {
  up () {
    this.create('colaboradores', (table) => {
      table.increments('id')
      table.string('nome', 70).notNullable()
      table.string('apelido', 30).notNullable()
      table.string('sexo', 1).notNullable()
      table.string('interno_externo', 1).notNullable()

      table.integer('id_user').unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

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

      table.string('ponto_referencia', 50).notNullable()
      table.string('pessoa_recado', 50).notNullable()
      table.string('fone_ddd_recado', 2).notNullable()
      table.string('fone_numero_recado', 9).notNullable()


      table.date('data_admissao').notNullable()
      table.date('data_demissao').notNullable()

      table.string('cpf', 11).notNullable()
      table.string('rg_numero', 10).notNullable()
      table.date('rg_data_emissao').notNullable()
      table.string('rg_orgao_emissor', 3).notNullable()
      table.string('rg_uf_emissora', 2).notNullable()
      table.string('cnpj_mei', 14).notNullable()
      table.boolean("possui_cnh").notNullable()
      table.string('qual_veiculo', 30).notNullable()
      table.string('banco_num', 3).notNullable()
      table.string('banco_agencia', 4).notNullable()
      table.string('agencia_digito', 1).notNullable()
      table.string('banco_conta', 20).notNullable()
      table.string('conta_digito', 1).notNullable()
      table.string('pix', 20).notNullable()

      table.integer('id_foto').unsigned()
      .references('id')
      .inTable('images')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');


      table.timestamps()
    })
  }

  down () {
    this.drop('colaboradores')
  }
}

module.exports = ColaboradoreSchema
