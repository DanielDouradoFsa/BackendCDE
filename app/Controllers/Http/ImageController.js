'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
const Helpers = use('Helpers')
const Image = use('App/Models/Image')
const Database = use('Database')
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new image.
   * GET images/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      /*{
        types: ['image'],
        size: '2mb'
      } */
      const images = request.file('image')
      console.log(images)
      const valor = request.body.razaoSocial
      await images.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}-${request.body.razaoSocial}.jpeg`
      }))

      if (!images.movedAll()) {
        return images.errors()
      }
      var fileNames = []
      await Promise.all(
        images
          .movedList()
          .map(image => fileNames.push({path:image.fileName}))
      )
      const fotos = await Image.createMany(fileNames,trx)
      await trx.commit()
      return response.status(201).send(fotos);
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
    //console.log(images)

  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try{
      const image = await Image.findBy("id",params.id_foto)
      return response.download(Helpers.tmpPath(`uploads/${image.path}`))
    }catch(err){

    }
    
  }

  /**
   * Render a form to update an existing image.
   * GET images/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const imagem = await Image.findBy('id',request.params.id)
      const imagemReq = request.only([
        "path" 
      ])
      imagem.merge({...imagemReq})
      imagem.save(trx)
      await trx.commit()
      
      return response.status(201).send({ message: 'Imagem alterado com sucesso' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ImageController
