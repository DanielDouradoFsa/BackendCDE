'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with seguimentoparceiros
 */
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
      const {
        uf,
     
      } = request.all()

      const categoriaParceiro = await categoriaParceiro.create({
        id_categoria: categoriaParceiro.id,
        segmento_descricao:segmento_descricao
      }, trx)

      const segmentoParceiro = await segmentoEndereco.create({
        id_categoria: categoriaParceiro.id,
        segmento_descricao:segmento_descricao
      }, trx)

      await trx.commit()

      return response.status(201).send({ message: 'Endereço criado com sucesso' });
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
