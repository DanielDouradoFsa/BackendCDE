'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with seguimentoparceiros
 */
const Database = use('Database')
const SegmentoParceiro = use("App/Models/SegmentoParceiro")
const { validateAll } = use('Validator')
class SeguimentoParceiroController {
  /**
   * Show a list of all seguimentoparceiros.
   * GET seguimentoparceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const segmentoParceiro = await Database
        .select('*','segmento_parceiros.id as pk')
        .table('segmento_parceiros')
        .innerJoin('categoria_parceiros','segmento_parceiros.id_categoria','categoria_parceiros.id')
      response.send(segmentoParceiro)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }
  async indexPorCategoria ({ request, response, view }) {
    try {
      const segmentoParceiro = await Database
        .select('*','segmento_parceiros.id as pk')
        .table('segmento_parceiros')
        .where('id_categoria',request.params.idCategoria)
        .innerJoin('categoria_parceiros','segmento_parceiros.id_categoria','categoria_parceiros.id')
      response.send(segmentoParceiro)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new seguimentoparceiro.
   * GET seguimentoparceiros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new seguimentoparceiro.
   * POST seguimentoparceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        "seguimento_descricao.required":"Campo obrigatório"
      }
      const validation = await validateAll(request.all(), {
        segmento_descricao: 'required'
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const {
        id_categoria,
        segmento_descricao
      } = request.all()

      const segmentoParceiro = await SegmentoParceiro.create({
        id_categoria: id_categoria,
        segmento_descricao:segmento_descricao
      }, trx)

      await trx.commit()

      return response.status(201).send({ message: 'Segmento criado com sucesso' });
    } catch (err) {
        await trx.rollback()
        return response.status(400).send({
          error: `Erro: ${err.message}`
        })
    }
  }

  /**
   * Display a single seguimentoparceiro.
   * GET seguimentoparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing seguimentoparceiro.
   * GET seguimentoparceiros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update seguimentoparceiro details.
   * PUT or PATCH seguimentoparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const erroMessage = {
        'segmento_descricao.min': 'Escreva uma descrição maior',
      }
      const validation = await validateAll(request.all(), {
        segmento_descricao: 'min:5',
      }, erroMessage)

      if (validation.fails()) {
        return response.status(400).send({
          message: validation.messages()
        })
      }
      const segmentoParceiro = await SegmentoParceiro.findBy('id', request.params.id)

      const segmentoParceiroReq = await request.only([
        "segmento_descricao",
      ])
      segmentoParceiro.merge({ ...segmentoParceiroReq})
      await segmentoParceiro.save(trx)
      await trx.commit()
      return response.status(201).send({ message: 'Segmento alterado com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a seguimentoparceiro with id.
   * DELETE seguimentoparceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SeguimentoParceiroController
