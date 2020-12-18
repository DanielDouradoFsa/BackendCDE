'use strict'

const Database = use('Database')
const Entidade = use('App/Models/Entidade')
const Parceiro = use('App/Models/Parceiro')
const Endereco = use('App/Models/Endereco')
const User = use('App/Models/User')
const Telefone = use('App/Models/Telefone')
const Image = use('App/Models/Image')
const PlanoEscolhido = use('App/Models/PlanoEscolhido')
const PlanoEscolhidoParceiro = use('App/Models/PlanoEscolhidoParceiro')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with planoescolhidoparceiros
 */
class PlanoEscolhidoParceiroController {
  /**
   * Show a list of all planoescolhidoparceiros.
   * GET planoescolhidoparceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  
    try {
      const parceirosPorEntidade = await Database
      .select('*')
      .table('entidades')
      .innerJoin('telefones', 'entidades.id_telefone', 'telefone.id')
      .innerJoin('enderecos', 'entidades.id_endereco', 'enderecos.id')
      .innerJoin('images', 'entidades_id_imagem1', 'images.id')
      .innerJoin('images', 'entidades_id_imagem2', 'images.id')
      .innerJoin('images', 'entidades_id_imagem3', 'images.id')
      .innerJoin('images', 'entidades_id_imagem4', 'images.id')
      .innerJoin('images', 'entidades_id_imagem5', 'images.id')
      .innerJoin('parceiros', 'entidades.id', 'parceiros.id_entidade')
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }

  }

  /**
   * Render a form to be used for creating a new planoescolhidoparceiro.
   * GET planoescolhidoparceiros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new planoescolhidoparceiro.
   * POST planoescolhidoparceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  
    const trx = await Database.beginTransaction()
    try {
      const {
        razao_social,
        nome_fantasia,
        responsavel_nome,
        responsavel_cpf,
        link_site,
        link_facebook,
        link_instagram,
        Perfil,
        
        path_img1,
        path_img2,
        path_img3,
        path_img4,
        path_img5,

        fone_fixo_ddd,
        fone_fixo_numero,
        celular_ddd,
        celular_numero,

        email,
        senha,

        cep,
        uf,
        cidade,
        rua,
        numero,
        bairro,
        complemento,
        
        id_cat,
        id_seg,
        cpf_cnpj,
        apelido_responsavel,
        desconto_percentual,
        tipo_pessoa_fj,

        id_plano,

        id_colaborador_vendedor,
        id_colaborador_digitador,
        id_banco_cde,
        id_forma_pagamento,
        data_emissao,
        data_final,
        razao_nome,
        data_vencimento,
        valor_plano,
        multa_percentual,
        multa_valor,
        juros_valor,
        juros_percentual,
        valor_pago,
        data_pagamento


      } = request.all()

      const endereco = await Endereco.create({
        cep,
        uf,
        cidade,
        rua,
        numero,
        bairro,
        complemento
      }, trx)
      
      const user = await User.create({
        email,
        username:email,
        password:senha
      }, trx)

      const img1 = await Image.create({
        path:path_img1
      }, trx)
      const img2 = await Image.create({
        path:path_img2
      }, trx)
      const img3 = await Image.create({
        path:path_img3
      }, trx)
      const img4 = await Image.create({
        path:path_img4
      }, trx)
      const img5 = await Image.create({
        path:path_img5
      }, trx)
      
      const telefone = await Telefone.create({
        fone_fixo_ddd,
        fone_fixo_numero,
        celular_ddd,
        celular_numero,
      }, trx)

      const entidade = await Entidade.create({
        razao_social,
        nome_fantasia,
        responsavel_nome,
        responsavel_cpf,
        link_site,
        link_facebook,
        link_instagram,
        Perfil,
        id_telefone: telefone.id,
        id_user: user.id,
        id_endereco: endereco.id,
        id_imagem1:img1.id,
        id_imagem2:img2.id,
        id_imagem3:img3.id,
        id_imagem4:img4.id,
        id_imagem5:img5.id,
      },trx)
      
      const parceiro = await Parceiro.create({
        id_entidade: entidade.id,
        id_categoria: id_cat,
        id_segmento: id_seg,
        cpf_cnpj,
        apelido_responsavel,
        desconto_percentual,
        tipo_pessoa_fj
      }, trx)

      const planoEscolhido = await PlanoEscolhido.create({
        id_colaborador_vendedor,
        id_colaborador_digitador,
        id_banco_cde,
        id_forma_pagamento,
        data_emissao,
        data_final,
        razao_nome,
        data_vencimento,
        valor_plano,
        multa_percentual,
        multa_valor,
        juros_valor,
        juros_percentual,
        valor_pago,
        data_pagamento

      })

      const planoEscolhidoParceiro = await PlanoEscolhidoParceiro.create({
        id_plano,
        id_parceiro: parceiro.id,
        id_plano_escolhido: planoEscolhido.id
      })

      await trx.commit()

      return response.status(201).send({ message: 'Plano de Parceiro escolhido com sucesso!' });
    } catch (err) {
        await trx.rollback()
        return response.status(400).send({
          error: `Erro: ${err.message}`
        })
    }
  
  }

  /**
   * Display a single planoescolhidoparceiro.
   * GET planoescolhidoparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try{
      const entidade = await Entidade.findBy('id_user', request.params.id_user)
      const parceiro = await Parceiro.findBy('id_entidade', entidade.id)
      const endereco = await Endereco.findBy('id', entidade.id_endereco)
      const image1 = await Image.findBy('id', entidade.id_imagem1)
      const image2 = await Image.findBy('id', entidade.id_imagem2)
      const image3 = await Image.findBy('id', entidade.id_imagem3)
      const image4 = await Image.findBy('id', entidade.id_imagem4)
      const image5 = await Image.findBy('id', entidade.id_imagem5)
      const user = await User.findBy('id', entidade.id_user)
      const fullParceiro = {
        entidade,
        parceiro,
        endereco,
        image1,
        image2,
        image3,
        image4,
        image5,
        user
      }

      return response.status(200).json(fullParceiro)

    }catch(err){
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to update an existing planoescolhidoparceiro.
   * GET planoescolhidoparceiros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update planoescolhidoparceiro details.
   * PUT or PATCH planoescolhidoparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  
    const trx = await Database.beginTransaction()
    try {
      const parceiro = await Parceiro.findBy('id', request.params.id)
      const entidade = await Entidade.findBy('id_user', request.params.id_user)
      const endereco = await Endereco.findBy('id', entidade.id_endereco)
      const telefone = await Telefone.findBy('id', entidade.id_telefone)
      const image1 = await Image.findBy('id', entidade.id_imagem1)
      const image2 = await Image.findBy('id', entidade.id_imagem2)
      const image3 = await Image.findBy('id', entidade.id_imagem3)
      const image4 = await Image.findBy('id', entidade.id_imagem4)
      const image5 = await Image.findBy('id', entidade.id_imagem5)
      const user = await User.findBy('id', entidade.id_user)


      const parceiroReq = request.only([
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
        "ativo",
        "cpf",
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
      const image1Req = request.only([
        "path1"
      ])
      const image2Req = request.only([
        "path2"
      ])
      const image3Req = request.only([
        "path3"
      ])
      const image4Req = request.only([
        "path4"
      ])
      const image5Req = request.only([
        "path5"
      ])
      parceiro.merge({ ...parceiroReq })
      telefone.merge({ ...telefoneReq })
      endereco.merge({ ...enderecoReq })
      image1.merge({ ...image1Req })
      image2.merge({ ...image2Req })
      image3.merge({ ...image3Req })
      image4.merge({ ...image4Req })
      image5.merge({ ...image5Req })
      user.merge({ ...userReq })

      await colaborador.save(trx)
      await telefone.save(trx)
      await endereco.save(trx)
      await user.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Colaborador alterado com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  
  }

  /**
   * Delete a planoescolhidoparceiro with id.
   * DELETE planoescolhidoparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PlanoEscolhidoParceiroController
