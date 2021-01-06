'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with parceiros
 */

const Database = use('Database')
const Endereco = use('App/Models/Endereco')
const Parceiro = use('App/Models/Parceiro')
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




class ParceiroController {
  /**
   * Show a list of all parceiros.
   * GET parceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const parceiros = await Database
        .select('*')
        .table('entidades')
        .innerJoin('parceiros', 'entidades.id', 'parceiros.id_Entidade')
        .innerJoin('telefones', 'entidades.id_telefone', 'telefones.id')
        .innerJoin('enderecos','entidades.id_endereco','enderecos.id')
        .innerJoin('users','entidades.id_user','users.id')
      response.send(parceiros)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new parceiro.
   * GET parceiros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new parceiro.
   * POST parceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
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
        'cpf_cnpj.integer': 'Insira apenas valores numéricos',
        'desconto_percentual.integer': 'Insira apenas valores numéricos',
        'responsavel_cpf.integer': 'Insira apenas valores numéricos',
        'valor_plano.integer': 'Insira apenas valores numéricos',
        'multa_percentual.integer': 'Insira apenas valores numéricos',
        'juros_percentual.integer': 'Insira apenas valores numéricos',
      }
      const validation = await validateAll(request.all(), {
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
        celular_numero: 'required |integer',//TELEFONE
        cpf_cnpj: 'required |integer',
        nome_responsavel: 'required',
        desconto_percentual: 'required|integer',
        tipo_pessoa_fj: 'required',//PARCEIRO
        razao_social: 'required',
        nome_fantasia: 'required',
        responsavel_nome: 'required',
        responsavel_cpf: 'required |integer',
        link_site: 'required',
        link_facebook: 'required',
        link_instagram: 'required',
        Perfil: 'required',
        data_emissao: 'required',
        data_final: 'required',
        plano_ativo: 'required',
        data_vencimento: 'required',
        valor_plano: 'required |integer',
        multa_percentual: 'required|integer',
        juros_percentual: 'required|integer',
        descricao_forma_pagamento: 'required'
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
        cpf_cnpj,
        nome_responsavel,
        desconto_percentual,
        tipo_pessoa_fj,//PARCEIRO
        razao_social,
        nome_fantasia,
        responsavel_nome,
        responsavel_cpf,
        link_site,
        link_facebook,
        link_instagram,
        Perfil,
        id_imagem1,
        id_imagem2,
        id_imagem3,
        id_imagem4,
        id_imagem5,//ENTIDADE
        id_plano_parceiro,
        id_banco_cde,
        id_colaborador_vendedor,
        id_colaborador_digitador,
        data_emissao,
        data_final,
        plano_ativo,
        data_vencimento,
        valor_plano,
        multa_percentual,
        multa_valor,
        juros_valor,
        juros_percentual,
        valor_pago,
        data_pagamento,
        descricao_forma_pagamento
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
      const entidade = await Entidade.create({
        id_endereco: endereco.id,
        id_telefone: telefone.id,
        razao_social,
        nome_fantasia,
        responsavel_nome,
        responsavel_cpf,
        link_site,
        link_facebook,
        link_instagram,
        Perfil,
        id_user: user.id,
        id_imagem1,
        id_imagem2,
        id_imagem3,
        id_imagem4,
        id_imagem5
      }, trx)
      const parceiro = await Parceiro.create({
        cpf_cnpj,
        nome_responsavel,
        desconto_percentual,
        tipo_pessoa_fj,
        id_entidade: entidade.id,
      }, trx)
      const formaPagamento = await FormaPagamento.create({
        descricao_forma_pagamento
      }, trx)
      const planoEscolhido = await PlanoEscolhido.create({
        id_banco_cde,
        id_colaborador_vendedor,
        id_colaborador_digitador,
        id_forma_pagamento: formaPagamento.id,
        data_emissao,
        data_final,
        plano_ativo,
        data_vencimento,
        valor_plano,
        multa_percentual,
        multa_valor,
        juros_valor,
        juros_percentual,
        valor_pago,
        data_pagamento,
      }, trx)
      const planoEscolhidoParceiro = await PlanoEscolhidoParceiro.create({
        id_plano_parceiro,
        id_parceiro: parceiro.id,
        id_plano_escolhido: planoEscolhido.id
      }, trx)
      await trx.commit()
      return response.status(201).send({ message: 'Parceiro criado com sucesso!' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Display a single parceiro.
   * GET parceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const entidade = await Entidade.findBy('id', request.params.id)
      const parceiro = await Parceiro.findBy('id_Entidade', entidade.id)
      const endereco = await Endereco.findBy('id', entidade.id_endereco)
      const user = await User.findBy('id', entidade.id_user)
      const fullParceiro = {
        entidade,
        parceiro,
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
   * Render a form to update an existing parceiro.
   * GET parceiros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update parceiro details.
   * PUT or PATCH parceiros/:id
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
        'CNPJ.integer': 'Insira apenas valores numéricos',
        'CNPJ.unique': 'Valor já cadastrado no Sistema',
        'responsavel_cpf.integer': 'Insira apenas valores numéricos',
        'valor_plano.integer': 'Insira apenas valores numéricos',
        'multa_percentual.integer': 'Insira apenas valores numéricos',
        'juros_percentual.integer': 'Insira apenas valores numéricos',
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
        cpf_cnpj: 'integer',
        desconto_percentual: 'integer',
        responsavel_cpf: 'integer',
        valor_plano: 'integer',
        multa_percentual: 'integer',
        juros_percentual: 'integer',
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const parceiro = await Parceiro.findBy('id', request.params.id)
      const entidade = await Entidade.findBy('id', parceiro.id_entidade)
      const endereco = await Endereco.findBy('id', entidade.id_endereco)
      const telefone = await Telefone.findBy('id', entidade.id_telefone)
      const user = await User.findBy('id', entidade.id_user)

      const entidadeReq = await request.only([
        "razao_social",
        "nome_fantasia",
        "responsavel_nome",
        "responsavel_cpf",
        "link_site",
        "link_facebook",
        "link_instagram",
        "Perfil",
        "id_imagem1",
        "id_imagem2",
        "id_imagem3",
        "id_imagem4",
        "id_imagem5"
      ])
      const parceiroReq = request.only([
        "cpf_cnpj",
        "nome_responsavel",
        "desconto_percentual",
        "tipo_pessoa_fj",
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
      parceiro.merge({ ...parceiroReq })
      entidade.merge({ ...entidadeReq })
      telefone.merge({ ...telefoneReq })
      endereco.merge({ ...enderecoReq })
      user.merge({ ...userReq })

      await parceiro.save(trx)
      await entidade.save(trx)
      await telefone.save(trx)
      await endereco.save(trx)
      await user.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Parceiro alterado com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a parceiro with id.
   * DELETE parceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

  }
}

module.exports = ParceiroController
