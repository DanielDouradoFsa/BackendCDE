'use strict'
const User = use('App/Models/User')
const Associado = use('App/Models/Associado')
const Colaborador = use("App/Models/Colaboradore")
const Instituicao = use("App/Models/Instituicao")
const Parceiro = use("App/Models/Parceiro")
const Entidade = use("App/Models/Entidade")
const Cde = use("App/Models/Cde")
const { validateAll } = use('Validator')
class UserController {
    async login({ request, response, auth }) {

        try {
            const erroMessage = {
                "email.required": "Esse campo é obrigatório",
                "email.email": "Escreva no formato: email@email.com",
                "password.required": "Esse campo é obrigatório", //USER
              }
              const validation = await validateAll(request.all(), {
                email: "required|email",
                password: "required", //USER
              }, erroMessage)
        
              if (validation.fails()) {
                return response.status(400).send({
                  message: validation.messages()
                })
              }
            const { email, password, tipo } = request.only(['email', 'password', 'tipo'])
            const user = await User.findBy('email', email)
            if (!user)
                return response.status(400).send({
                    error: `Erro: O email inserido não corresponde a nenhuma conta. `
                })
            try {
                if (tipo == "INSTITUICAO" || tipo == "PARCEIRO") {
                    const entidade = await Entidade.findByOrFail('id_user', user.id)
                    tipo == "INSTITUICAO"
                        ? await Instituicao.findByOrFail('id_entidade', entidade.id)
                        : await Parceiro.findByOrFail('id_entidade', entidade.id)
                } else if (tipo == "ASSOCIADO")
                    await Associado.findByOrFail('id_user', user.id)
                else if (tipo == "COLABORADOR")
                    await Colaborador.findByOrFail('id_user', user.id)
                else if (tipo == "CDE")
                    await Cde.findByOrFail('id_user', user.id)
            } catch (err) {
                return response.status(400).send({
                    error: `Verifique o tipo escolhido no login`
                })
            }
            const validaToken = await auth.attempt(email, password)
            return response.status(200).send(validaToken)

        } catch (err) {
            return response.status(400).send({
                error: `Erro: ${err.message}`
            })
        }

    }
    async dataLogin({ request, response, auth }) {
        try {
            const tipo = request.body.tipo
            if (tipo == "associado")
                await Associado.findByOrFail('id_user', auth.user.id)
            else if (tipo == "instituicao")
                await Instituicao.findByOrFail('id_user', auth.user.id)
            else if (tipo == "colaborador")
                await Colaborador.findByOrFail('id_user', auth.user.id)
            else if (tipo == "cde")
                await Cde.findByOrFail('id_user', auth.user.id)
            const user = await User.findBy("id", auth.user.id)
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
    async destroy({ params, request, response }) {
        try {
            const usuario = await User.find(request.params.id_user)

            if (usuario == null)
                return response.status(401).send({ message: "parceiro não encontrado" })

            console.log(usuario)
            usuario.ativo = false;

            await usuario.save()
            console.log()

            return response.status(201).send({ message: "usuario inativado com sucesso" })

        } catch (err) {
            return response.status(404).send({
                message: `Erro:${err.message}`
            })
        }
    }
}

module.exports = UserController
