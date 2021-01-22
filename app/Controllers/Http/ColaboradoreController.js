'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with colaboradores
 */
const Database = use('Database')
const Endereco = use('App/Models/Endereco')
const Telefone = use('App/Models/Telefone')
const Image = use('App/Models/Image')
const User = use('App/Models/User')
const Colaborador = use('App/Models/Colaboradore')
class ColaboradoreController {
  /**
   * Show a list of all colaboradores.
   * GET colaboradores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const colaboradores = await Database
        .table('colaboradores')
        .innerJoin('telefones', 'colaboradores.id_telefone', 'telefones.id')
        .innerJoin('enderecos','colaboradores.id_endereco','enderecos.id')
        .innerJoin('users','colaboradores.id_user','users.id')
        .select('*','colaboradores.id as pk')
        
      response.send(colaboradores)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new colaboradore.
   * GET colaboradores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new colaboradore.
   * POST colaboradores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const {
        email,
        password,
        uf,
        cidade,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        fone_fixo_ddd,
        fone_fixo_numero,
        celular_ddd,
        celular_numero,
        nome,
        apelido,
        sexo,
        id_imagem1,
        interno_externo,
        ponto_referencia,
        pessoa_recado,
        fone_ddd_recado,
        fone_numero_recado,
        data_admissao,
        data_demissao,
        cpf,
        rg_numero,
        rg_data_emissao,
        rg_orgao_emissor,
        rg_uf_emissora,
        cnpj_mei,
        possui_cnh,
        qual_veiculo,
        banco_num,
        banco_agencia,
        agencia_digito,
        banco_conta,
        conta_digito,
        pix
      } = request.all()
      const user = await User.create({
        email,
        password,
        username: email
      }, trx)
      const endereco = await Endereco.create({
        uf,
        cidade,
        cep,
        rua,
        numero,
        complemento,
        bairro
      }, trx)
      const telefone = await Telefone.create({
        fone_fixo_ddd,
        fone_fixo_numero,
        celular_ddd,
        celular_numero
      }, trx)
      const colaborador = await Colaborador.create({
        id_telefone: telefone.id,
        id_user: user.id,
        id_endereco: endereco.id,
        id_imagem1,
        nome,
        apelido,
        sexo,
        interno_externo,
        ponto_referencia,
        pessoa_recado,
        fone_ddd_recado,
        fone_numero_recado,
        data_admissao,
        data_demissao,
        cpf,
        rg_numero,
        rg_data_emissao,
        rg_orgao_emissor,
        rg_uf_emissora,
        cnpj_mei,
        possui_cnh,
        qual_veiculo,
        banco_num,
        banco_agencia,
        agencia_digito,
        banco_conta,
        conta_digito,
        pix
      }, trx)
      await trx.commit()
      return response.status(201).send({ message: 'Colaborador criado com sucesso!' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Display a single colaboradore.
   * GET colaboradores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const colaborador = await Colaborador.findBy('id', request.params.id)
      const endereco = await Endereco.findBy('id', colaborador.id_endereco)
      const telefone = await Telefone.findBy('id', colaborador.id_telefone)
      const user = await User.findBy('id', colaborador.id_user)
      const fullParceiro = {
        colaborador,
        endereco,
        telefone,
        user
      }
      return response.status(200).json(fullParceiro)

    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to update an existing colaboradore.
   * GET colaboradores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update colaboradore details.
   * PUT or PATCH colaboradores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const colaborador = await Colaborador.findBy('id', request.params.id)
      const endereco = await Endereco.findBy('id', colaborador.id_endereco)
      const telefone = await Telefone.findBy('id', colaborador.id_telefone)
      const user = await User.findBy('id', colaborador.id_user)

      const colaboradorReq = request.only([
        "nome",
        "apelido",
        "sexo",
        "interno_externo",
        "ponto_referencia",
        "pessoa_recado",
        "fone_ddd_recado",
        "fone_numero_recado",
        "data_admissao",
        "data_demissao",
        "cpf",
        "id_imagem1",
        "rg_numero",
        "rg_data_emissao",
        "rg_orgao_emissor",
        "rg_uf_emissora",
        "cnpj_mei",
        "possui_cnh",
        "qual_veiculo",
        "banco_num",
        "banco_agencia",
        "agencia_digito",
        "banco_conta",
        "conta_digito",
        "pix"
      ])
      const enderecoReq = request.only([
        "uf",
        "cidade",
        "cep",
        "rua",
        "numero",
        "complemento",
        "bairro"
      ])
      const telefoneReq = request.only([
        "fone_fixo_ddd",
        "fone_fixo_numero",
        "celular_ddd",
        "celular_numero"
      ])
      const userReq = request.only([
        "email",
        "password",
      ])
      colaborador.merge({ ...colaboradorReq })
      telefone.merge({ ...telefoneReq })
      endereco.merge({ ...enderecoReq })
      user.merge({ ...userReq })

      await colaborador.save(trx)
      await telefone.save(trx)
      await endereco.save(trx)
      await user.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Colaborador alterado com sucesso' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a colaboradore with id.
   * DELETE colaboradores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ColaboradoreController
