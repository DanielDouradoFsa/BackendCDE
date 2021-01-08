'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cdes
 */
const Database = use('Database')
const Endereco = use('App/Models/Endereco')
const Telefone = use('App/Models/Telefone')
const Cde = use("App/Models/Cde")
const Image = use('App/Models/Image')
const User = use('App/Models/User')
const FormaPagamento = use('App/Models/FormaPagamento')
const TipoCargoResponsavel = use('App/Models/TipoCargoResponsavel')
const { validateAll } = use('Validator')
class CdeController {
  /**
   * Show a list of all cdes.
   * GET cdes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const administrador = await Database
        .select('*')
        .table('cdes')
        .innerJoin('telefones', 'cdes.id_telefone', 'telefones.id')
        .innerJoin('enderecos','cdes.id_endereco','enderecos.id')
        .innerJoin('users','cdes.id_user','users.id')
      response.send(administrador)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new cde.
   * GET cdes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new cde.
   * POST cdes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        ".email_geral.email": 'Escreva no formato email@email.com',
        ".email_geral.required": 'Esse campo é obrigatório',
        ".email_parceiros.required": 'Esse campo é obrigatório',
        ".email_parceiros.email": 'Escreva no formato email@email.com',
        ".email_instituicoes.required": 'Esse campo é obrigatório',
        ".email_instituicoes.email": 'Escreva no formato email@email.com',
        ".email_usuarios.required": 'Esse campo é obrigatório',
        ".email_usuarios.email": 'Escreva no formato email@email.com',
        'email.required': 'Esse campo é obrigatório',
        'email.unique': 'Valor já cadastrado no Sistema',
        'email.email': 'Escreva no formato email@email.com',
        'password.required': 'Esse campo é obrigatório', //USER
        'uf.required': 'Esse campo é obrigatório',
        'uf.integer': 'Insira apenas valores numéricos',
        'cidade.required': 'Esse campo é obrigatório',
        'cep.required': 'Esse campo é obrigatório',
        'cep.integer': 'Insira apenas valores numéricos',
        'rua.required': 'Esse campo é obrigatório',
        'numero.required': 'Esse campo é obrigatório',
        'numero.integer': 'Insira apenas valores numéricos',
        'complemento.required': 'Esse campo é obrigatório',
        'bairro.required': 'Esse campo é obrigatório', //ENDERECO
        'fone_fixo_ddd.required': 'Esse campo é obrigatório',
        'fone_fixo_ddd.integer': 'Insira apenas valores numéricos',
        'fone_fixo_numero.required': 'Esse campo é obrigatório',
        'fone_fixo_numero.integer': 'Insira apenas valores numéricos',
        'celular_ddd.required': 'Esse campo é obrigatório',
        'celular_ddd.integer': 'Insira apenas valores numéricos',
        'celular_numero.required': 'Esse campo é obrigatório',
        'celular_numero.integer': 'Insira apenas valores numéricos',//TELEFONE
        'cnpj.required': 'Esse campo é obrigatório',
        'cnpj.integer': 'Insira apenas valores numéricos',
        'cnpj.unique': 'Valor já cadastrado no Sistema',
        'razao_social.required': 'Esse campo é obrigatório',
        'fantasia.required': 'Esse campo é obrigatório',
        'percentual_multa.required': 'Esse campo é obrigatório',
        'percentual_multa.integer': 'Insira apenas valores numéricos',
        'percentual_juros.required': 'Esse campo é obrigatório',
        'percentual_juros.integer': 'Insira apenas valores numéricos',

      }
      const validation = await validateAll(request.all(), {
        email_geral: 'required|email',
        email_parceiros: 'required|email',
        email_instituicoes: 'required|email',
        email_usuarios: 'required|email',
        email: 'required |unique:users|email',
        password: 'required', //USER
        uf: 'required |integer',
        cidade: 'required',
        cep: 'required |integer',
        rua: 'required',
        numero: 'required |integer',
        complemento: 'required',
        bairro: 'required', //ENDERECO
        fone_fixo_ddd: 'required |integer',
        fone_fixo_numero: 'required |integer',
        celular_ddd: 'required |integer',
        celular_numero: 'required |integer',
        cnpj: 'required |integer |unique:cdes',
        razao_social: 'required',
        fantasia: 'required',
        percentual_multa: 'required|integer',
        percentual_juros: 'required|integer',
        //TELEFONE
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
        uf,
        cidade,
        cep,
        rua,
        numero,
        complemento,
        bairro, //ENDERECO
        fone_fixo_ddd,
        fone_fixo_numero,
        celular_ddd,
        celular_numero,//TELEFONE
        razao_social,
        fantasia,
        cnpj,
        email_geral,
        email_parceiros,
        email_instituicoes,
        email_usuarios,
        percentual_multa,
        percentual_juros
      } = request.all()
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
      const telefone = await Telefone.create({
        fone_fixo_ddd,
        fone_fixo_numero,
        celular_ddd,
        celular_numero
      }, trx)
      const cde = await Cde.create({
        id_user:user.id,
        id_telefone:telefone.id,
        id_endereco:endereco.id,
        razao_social,
        fantasia,
        cnpj,
        email_geral,
        email_parceiros,
        email_instituicoes,
        email_usuarios,
        percentual_multa,
        percentual_juros
      }, trx)
      await trx.commit()
      return response.status(201).send({ message: 'Administrador criado com sucesso!' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }

  }

  /**
   * Display a single cde.
   * GET cdes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const administrador = await Cde.findBy('id', params.id)
      const endereco = await Endereco.findBy('id', administrador.id_endereco)
      const telefone = await Telefone.findBy('id', administrador.id_telefone)
      const user = await User.findBy('id', administrador.id_user)
      const fullParceiro = {
        administrador,
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
   * Render a form to update an existing cde.
   * GET cdes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update cde details.
   * PUT or PATCH cdes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        'email.unique': 'Valor já cadastrado no Sistema',
        'email.email': 'Escreva no formato email@email.com',
        'uf.integer': 'Insira apenas valores numéricos',
        'cep.integer': 'Insira apenas valores numéricos',
        'numero.integer': 'Insira apenas valores numéricos',
        'fone_fixo_ddd.integer': 'Insira apenas valores numéricos',
        'fone_fixo_numero.integer': 'Insira apenas valores numéricos',
        'celular_ddd.integer': 'Insira apenas valores numéricos',
        'celular_numero.integer': 'Insira apenas valores numéricos',//TELEFONE
        'max_dependentes.integer': 'Insira apenas valores numéricos',
        'responsavel_fone_ddd.integer': 'Insira apenas valores numéricos',
        'responsavel_fone_numero.integer': 'Insira apenas valores numéricos',
        'cnpj.integer': 'Insira apenas valores numéricos',
        'cnpj.unique': 'Valor já cadastrado no Sistema',
        'responsavel_cpf.integer': 'Insira apenas valores numéricos',
        'valor_plano.integer': 'Insira apenas valores numéricos',
        'percentual_multa.integer': 'Insira apenas valores numéricos',
        'percentual_juros.integer': 'Insira apenas valores numéricos',
      }
      const validation = await validateAll(request.all(), {
        email: 'unique:users|email',
        uf: 'integer',
        cep: 'integer',
        numero: 'integer',
        fone_fixo_ddd: 'integer',
        fone_fixo_numero: 'integer',
        celular_ddd: 'integer',
        celular_numero: 'integer',//TELEFONE
        cnpj: 'integer |unique:cdes',
        percentual_multa: 'integer',
        percentual_juros: 'integer',
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const cde = await Cde.findBy('id', request.params.id)
      const endereco = await Endereco.findBy('id', cde.id_endereco)
      const telefone = await Telefone.findBy('id', cde.id_telefone)
      const user = await User.findBy('id', cde.id_user)

      const cdeReq = request.only([
        "razao_social",
        "fantasia",
        "cnpj",
        "email_geral",
        "email_parceiros",
        "email_instituicoes",
        "email_usuarios",
        "percentual_multa",
        "percentual_juro" 
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

      cde.merge({ ...cdeReq })
      telefone.merge({ ...telefoneReq })
      endereco.merge({ ...enderecoReq })
      user.merge({ ...userReq })

      await cde.save(trx)
      await telefone.save(trx)
      await endereco.save(trx)
      await user.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Administrador alterado com sucesso' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a cde with id.
   * DELETE cdes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = CdeController
