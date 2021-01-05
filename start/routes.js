'use strict'

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
Route.get('/dataLogin/:id_user', 'UserController.dataLogin').middleware('auth')

/**ROTAS COLABORADOR */
Route.post('/colaborador', 'ColaboradoreController.store')
Route.get('/colaborador/:id', 'ColaboradoreController.show').middleware("auth")
Route.patch('/colaborador/:id', 'ColaboradoreController.update').middleware("auth")
Route.get('/colaborador', 'ColaboradoreController.index').middleware("auth")

/**ROTAS Instituicao */
Route.post('/instituicao', 'InstituicaoController.store')
Route.get('/instituicao/:id', 'InstituicaoController.show').middleware("auth")
Route.patch('/instituicao/:id', 'InstituicaoController.update').middleware("auth")
Route.get('/instituicao', 'InstituicaoController.index').middleware("auth")

/*ROTAS DE PARCEIROS*/
Route.get('/parceiros','ParceiroController.index').middleware("auth")
Route.post('/parceiros', 'ParceiroController.store')
Route.get('/parceiros/:id_user','ParceiroController.show').middleware("auth")
Route.patch('/parceiros/:id_user','ParceiroController.update').middleware("auth")

Route.post('/criaImagem', 'ImageController.store')
Route.get('/criaImagem/:path','ImageController.show')
