'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with associados
 */
const Database = use('Database')
const Endereco = use('App/Models/Endereco')
const Parceiro = use('App/Models/Parceiro')
const Associado = use('App/Models/Associado')
const ValidaCPF = require('../../../Vali/ValidaCPF')
const Telefone = use('App/Models/Telefone')
const Image = use('App/Models/Image')
const User = use('App/Models/User')
const Entidade = use('App/Models/Entidade')
const Instituicao = use('App/Models/Instituicao')
const PlanoEscolhido = use('App/Models/PlanoEscolhido')
const PlanoEscolhidoParceiro = use('App/Models/PlanoEscolhidoParceiro')
const FormaPagamento = use('App/Models/FormaPagamento')
const TipoCargoResponsavel = use('App/Models/TipoCargoResponsavel')
const { validateAll } = use('Validator')
class AssociadoController {
  /**
   * Show a list of all associados.
   * GET associados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const associados = await Database
        .select('*','associados.id as pk')
        .table('associados')
        .innerJoin('enderecos', 'associados.id_endereco', 'enderecos.id')
        .innerJoin('users', 'associados.id_user', 'users.id')
      response.send(associados)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new associado.
   * GET associados/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new associado.
   * POST associados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        "email.required": "Esse campo é obrigatório",
        "email.unique": "Email já utilizado no sistema",
        "email.email": "Escreva no formato: email@email.com",
        "ativo.required": "Esse campo é obrigatório",
        "password.required": "Esse campo é obrigatório", //USER
        "isDependente.required": "Esse campo é obrigatório",
        "nome.required": "Esse campo é obrigatório",
        "sobre_nome.required": "Esse campo é obrigatório",
        "cpf.required": "Esse campo é obrigatório",
        "cpf.unique": "CPF já utilizado no Sistema",
        "cpf.integer": "Insira apenas valores numéricos",
        "DDD_celular.required": "Esse campo é obrigatório",
        "DDD_celular.integer": "Insira apenas valores numéricos",
        "numero_celular.required": "Esse campo é obrigatório",
        "numero_celular.integer": "Insira apenas valores numéricos",
        "uf.required": "Esse campo é obrigatório",
        "uf.integer": "Insira apenas valores numéricos",
        "cidade.required": "Esse campo é obrigatório",
        "cep.required": "Esse campo é obrigatório",
        "cep.integer": "Esse campo é obrigatório",
        "rua.required": "Esse campo é obrigatório",
        "numero.required": "Esse campo é obrigatório",
        "numero.integer": "Insira apenas valores numéricos",
        "complemento.required": "Esse campo é obrigatório",
        "bairro.required": "Esse campo é obrigatório"
      }
      const validation = await validateAll(request.all(), {
        email: "required |unique:users|email",
        ativo: "required",
        password: "required", //USER
        isDependente: "required",
        nome: "required",
        sobre_nome: "required",
        cpf: "required|integer|unique:associados",
        DDD_celular: "required|integer",
        numero_celular: "required|integer",
        uf: "required|integer",
        cidade: "required",
        cep: "required|integer",
        rua: "required",
        numero: "required|integer",
        complemento: "required",
        bairro: "required",
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const {
        email,
        ativo,
        password, //USER
        id_associado,
        isDependente,
        nome,
        sobre_nome,
        cpf,
        DDD_celular,
        numero_celular,
        uf,
        cidade,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        id_instituicao,
        id_foto } = request.all()
      // if (!ValidaCPF.testaCPF(cpf))
      //   return response.status(400).send({
      //     "message": "CPF inválido",
      //     "field": "CPF",
      //     "validation": "ValidacaoCNPJ"
      //   })
      if (isDependente && id_associado != null) {
        const { max_dependentes } = await Instituicao.findBy("id", id_instituicao)
        const dependentes = await Database.from('associados')
          .where('id', id_associado)
          .getCount()
        if (dependentes > max_dependentes)
          return response.status(400).send({ error: 'Titular já atingiu o número máximo de dependentes' });
      } else if (isDependente && id_associado == null)
        return response.status(400).send({
          "message": "Escolha um associado como seu Titular",
          "field": "id_associado",
          "validation": "ValidacaoDependente"
        })

      const user = await User.create({
        email,
        password,
        ativo,
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
      const associado = await Associado.create({
        nome,
        sobre_nome,
        isDependente,
        id_associado,
        cpf,
        DDD_celular,
        numero_celular,
        id_instituicao,
        id_foto,
        id_user: user.id,
        id_endereco: endereco.id
      }, trx)
      await trx.commit()
      return response.status(201).send({ message: 'Associado criado com sucesso!' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Display a single associado.
   * GET associados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const associado = await Associado.findBy('id', request.params.id)
      const endereco = await Endereco.findBy('id', associado.id_endereco)
      const user = await User.findBy('id', associado.id_user)
      const fullParceiro = {
        associado,
        endereco,
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
   * Render a form to update an existing associado.
   * GET associados/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update associado details.
   * PUT or PATCH associados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a associado with id.
   * DELETE associados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const associado = await Associado.findBy('id', request.params.id)
      const dependentes = await Database.from('associados')
        .where('id_associado', associado.id)
        .innerJoin('users', 'associados.id_user', 'users.id')
        for (var i in dependentes) {
          const usuarioDependente = await User.findBy('id', dependentes[i].id_user)
          usuarioDependente.ativo = false
          usuarioDependente.save()
        }
      const usuarioTitular = await User.findBy('id', associado.id_user)
      usuarioTitular.ativo = false
      usuarioTitular.save()
      return response.status(201).send({ message: 'Associado inativado com sucesso!' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }
}

module.exports = AssociadoController
