'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pivoparceirosegmentos
 */
const PivoParceiroSegmento = use("App/Models/PivoParceiroSegmento")
class PivoParceiroSegmentoController {
  /**
   * Show a list of all pivoparceirosegmentos.
   * GET pivoparceirosegmentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const entidades = await Database
        .select('*','instituicaos.id as pk')
        .table('entidades')
        .innerJoin('instituicaos','entidades.id','instituicaos.id_entidade')
        .innerJoin('telefones', 'entidades.id_telefone', 'telefones.id')
        .innerJoin('enderecos','entidades.id_endereco','enderecos.id')
        .innerJoin('users','entidades.id_user','users.id')
      response.send(entidades)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new pivoparceirosegmento.
   * GET pivoparceirosegmentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new pivoparceirosegmento.
   * POST pivoparceirosegmentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      await PivoParceiroSegmento({
        id_segmento: request.body.id_segmento,
        id_parceiro: request.body.id_parceiro
      })
      await trx.commit()
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Display a single pivoparceirosegmento.
   * GET pivoparceirosegmentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pivoparceirosegmento.
   * GET pivoparceirosegmentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update pivoparceirosegmento details.
   * PUT or PATCH pivoparceirosegmentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a pivoparceirosegmento with id.
   * DELETE pivoparceirosegmentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PivoParceiroSegmentoController
