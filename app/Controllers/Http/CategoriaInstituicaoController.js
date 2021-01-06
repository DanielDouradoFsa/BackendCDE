'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categoriainstituicaos
 */
const Database = use('Database')
const CategoriaInstituicao = use("App/Models/CategoriaInstituicao")
class CategoriaInstituicaoController {
  /**
   * Show a list of all categoriainstituicaos.
   * GET categoriainstituicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const categoriaInstituicao = await Database
        .select('*')
        .table('categoria_instituicaos')
      response.send(categoriaInstituicao)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new categoriainstituicao.
   * GET categoriainstituicaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new categoriainstituicao.
   * POST categoriainstituicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        "descricao_categoria.required":"Campo obrigatório"
      }
      const validation = await validateAll(request.all(), {
        descricao_categoria: 'required'
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const {
        descricao_categoria
      } =  request.all()
      await Categoriainstituicao.create({
        descricao_categoria
      },trx)
      await trx.commit()
      return response.status(201).send({ message: 'Categoria criada com sucesso' });
    } catch (err) {
      await trx.rollback()
        return response.status(400).send({
          error: `Erro: ${err.message}`
        })
    }
  }

  /**
   * Display a single categoriainstituicao.
   * GET categoriainstituicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing categoriainstituicao.
   * GET categoriainstituicaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update categoriainstituicao details.
   * PUT or PATCH categoriainstituicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        'descricao_categoria.min': 'Escreva uma descrição maior',
      }
      const validation = await validateAll(request.all(), {
        descricao_categoria: 'min:10',
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const categoriainstituicao = await CategoriaInstituicao.findBy('id', request.params.id)

      const categoriainstituicaoReq = await request.only([
        "descricao_categoria",
      ])
      categoriainstituicao.merge({ ...categoriainstituicaoReq})
      await categoriainstituicao.save(trx)
      await trx.commit()
      return response.status(201).send({ message: 'Categoria alterada com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a categoriainstituicao with id.
   * DELETE categoriainstituicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CategoriaInstituicaoController
