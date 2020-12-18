'use strict'

/*
|--------------------------------------------------------------------------
| DadosBoletoBancarioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const DadosBoleto = use('App/Models/DadosBancariosBoleto')
const User = use('App/Models/User')
const Cde = use('App/Models/Cde')
const Endereco = use('App/Models/Endereco')
const Telefone = use('App/Models/Telefone')
class DadosBoletoBancarioSeeder {
  async run () {
    const endereco = await Endereco.create({
      uf:'BA',
      cidade:'Feira de Santana',
      cep:'8888888',
      rua:'ruaCDE',
      numero:'123',
      complemento:'proximo ao CDE',
      bairro:'bairro do CDE'
    })
    const user = await User.create({
      email:'email@cde.com',
      password:'senhaCde',
      username: 'email'
    })
    const telefone = await Telefone.create({
      fone_fixo_ddd:'99',
      fone_fixo_numero:'888888888',
      celular_ddd:"77",
      celular_numero:"777777777"
    })
    const cde = await Cde.create({
      razao_social:'RazaoCde',
      fantasia:'fantasiaCde',
      cnpj:'0321554654',
      id_User:user.id,
      id_endereco:endereco.id,
      id_telefone:telefone.id,  
      email_geral:'email@geralcde',
      email_parceiros:'email@parceiroscde',
      email_instituicoes:'email@institcde',
      email_usuarios:'email@usuarioscde',
      percentual_multa:'4',
      percentual_juros:'5'
    })
    await DadosBoleto.create({
      id_cde:cde.id,
      banco_descricao:'bancodescricao',
      numero:'1',
      agencia:'2',
      agencia_digito:'3',
      operacao:'4',
      conta:'5',
      conta_digito:'6',
      convenio:'7',
      layout:'8',
      codigo_cedente:'1',
      pix:'asdads'
    })
  }
}

module.exports = DadosBoletoBancarioSeeder
