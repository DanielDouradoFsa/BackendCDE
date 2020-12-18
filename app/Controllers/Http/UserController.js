'use strict'
const User = use('App/Models/User')
class UserController {
    async login({ request, response, auth }) {

        try {
            const { email, password } = request.only(['email', 'password'])
            const validaToken = await auth.attempt(email, password)
            return response.status(200).send(validaToken)

        } catch (err) {
            return response.status(500).send({
                error: `Erro: ${err.message}`
            })
        }

    }
    async dataLogin({ request, response, auth }) {
        try {
            const user = await User.findBy("id",auth.user.id)
            //response.send(auth.user.id)
            return response.status(201).json(user)
        } catch (err) {
            return response.status(500).send({
                error: `Erro: ${err.message}`
            })
        }
    }

    async logout({ response, auth }) {
        try {
            await auth.logout()

            return response.status(200).send({
                message: 'Usuário desconectado'
            })
        } catch (error) {
            response.status(404).send('You are not logged in')
        }
    }
    async destroy({ params, request, response  }) {
        try{
            const usuario = await User.find(request.params.id_user)
            
            if(usuario == null)
              return response.status(401).send({message:"parceiro não encontrado"})
            
            console.log(usuario)
            usuario.ativo = false;
            
            await usuario.save()
            console.log()
            
            return response.status(201).send({message:"usuario inativado com sucesso"})
      
          }catch(err){
            return response.status(404).send({
              message: `Erro:${err.message}`
          })
        }
    }
}

module.exports = UserController
