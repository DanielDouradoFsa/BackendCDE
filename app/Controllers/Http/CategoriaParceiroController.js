'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categoriaparceiros
 */
const Database = use('Database')
const CategoriaParceiro = use("App/Models/CategoriaParceiro")
const { validateAll } = use('Validator')
class CategoriaParceiroController {
  /**
   * Show a list of all categoriaparceiros.
   * GET categoriaparceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const categoriaParceiro = await Database
        .select('*')
        .table('categoria_parceiros')
      response.send(categoriaParceiro)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new categoriaparceiro.
   * GET categoriaparceiros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new categoriaparceiro.
   * POST categoriaparceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        "categoria_descricao.required": "Campo obrigatório"
      }
      const validation = await validateAll(request.all(), {
        categoria_descricao: 'required'
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const {
        categoria_descricao
      } = request.all()
      await CategoriaParceiro.create({
        categoria_descricao
      }, trx)
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
   * Display a single categoriaparceiro.
   * GET categoriaparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing categoriaparceiro.
   * GET categoriaparceiros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update categoriaparceiro details.
   * PUT or PATCH categoriaparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        'categoria_descricao.min': 'Escreva uma descrição maior',
      }
      const validation = await validateAll(request.all(), {
        categoria_descricao: 'min:5',
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const categoriaParceiro = await CategoriaParceiro.findBy('id', request.params.id)

      const categoriaParceiroReq = await request.only([
        "categoria_descricao",
      ])
      categoriaParceiro.merge({ ...categoriaParceiroReq })
      await categoriaParceiro.save(trx)
      await trx.commit()
      return response.status(201).send({ message: 'Categoria alterada com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a categoriaparceiro with id.
   * DELETE categoriaparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = CategoriaParceiroController
