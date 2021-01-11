'use strict'

const CategoriaInstituicaoController = require('../app/Controllers/Http/CategoriaInstituicaoController')
const SeguimentoParceiroController = require('../app/Controllers/Http/SeguimentoParceiroController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


/**ROTAS LOGIN */
Route.delete('/user/:id_user','UserController.destroy').middleware("auth")
Route.post('/login', 'UserController.login').middleware('guest')
Route.get('/dataLogin', 'UserController.dataLogin')

/**ROTAS COLABORADOR */
Route.post('/colaborador', 'ColaboradoreController.store')
Route.get('/colaborador/:id', 'ColaboradoreController.show').middleware("auth")
Route.patch('/colaborador/:id', 'ColaboradoreController.update').middleware("auth")
Route.get('/colaborador', 'ColaboradoreController.index').middleware("auth")

/**ROTAS INSTITUICAO */
Route.post('/instituicao', 'InstituicaoController.store')
Route.get('/instituicao/:id', 'InstituicaoController.show').middleware("auth")
Route.patch('/instituicao/:id', 'InstituicaoController.update').middleware("auth")
Route.get('/instituicao', 'InstituicaoController.index').middleware("auth")
Route.post('/categoriaInstituicao', 'CategoriaInstituicaoController.store').middleware("auth")
Route.patch('/categoriaInstituicao/:id', 'CategoriaInstituicaoController.update').middleware("auth")
Route.get('/categoriaInstituicao/', 'CategoriaInstituicaoController.index').middleware("auth")

/**ROTAS PARCEIRO*/
Route.post('/parceiro', 'ParceiroController.store')
Route.get('/parceiro/:id', 'ParceiroController.show').middleware("auth")
Route.patch('/parceiro/:id', 'ParceiroController.update').middleware("auth")
Route.get('/parceiro', 'ParceiroController.index').middleware("auth")
Route.post('/categoriaParceiro', 'CategoriaParceiroController.store').middleware("auth")
Route.patch('/categoriaParceiro/:id', 'CategoriaParceiroController.update').middleware("auth")
Route.get('/categoriaParceiro', 'CategoriaParceiroController.index').middleware("auth")
Route.post('/segmentoParceiro', 'SeguimentoParceiroController.store').middleware("auth")
Route.patch('/segmentoParceiro/:id', 'SeguimentoParceiroController.update').middleware("auth")
Route.get('/segmentoParceiro', 'SeguimentoParceiroController.index').middleware("auth")

/*ROTAS ASSOCIADOS*/
Route.get('/associados','AssociadoController.index').middleware("auth")
Route.post('/associados', 'AssociadoController.store')
Route.get('/associados/:id','AssociadoController.show').middleware("auth")
Route.patch('/associados/:id','AssociadoController.update').middleware("auth")
Route.delete('/associados/:id','AssociadoController.destroy').middleware("auth")

/*ROTAS IMAGEM*/
Route.post('/imagem', 'ImageController.store')
Route.get('/imagem/:path','ImageController.show')
Route.patch('/imagem/:id','ImageController.update')

/*ROTAS ADMINISTRADOR */
Route.post('/cde', 'CdeController.store')
Route.get('/cde/:id', 'CdeController.show').middleware("auth")
Route.patch('/cde/:id', 'CdeController.update').middleware("auth")
Route.get('/cde', 'CdeController.index').middleware("auth")