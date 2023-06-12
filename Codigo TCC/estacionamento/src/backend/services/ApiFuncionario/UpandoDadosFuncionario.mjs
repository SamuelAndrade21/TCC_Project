import BancoParking from '../../server.mjs'
import { promisify } from 'util'

    export class UpandoDadosFuncionario{
       static async handle(funcionario_id,nome,email,telefone){
            const connection = await BancoParking.connect()
            const sql = "UPDATE funcionario SET nome ='" + nome + "',email = '" + email + "',telefone = '" + telefone + "'  WHERE funcionario_id = '" + funcionario_id + "'"
            const query = promisify(connection.query).bind(connection)
            const results = await query(sql)
            connection.end();
    
            if(results.length === 0){
                throw new Error("Nenhum valor encontrado!")
            }
            console.log(sql)
            return results
        }
        static  handleWithCallback(funcionario_id,nome,email,telefone,callback){
            this.handle(funcionario_id,nome,email,telefone)
           .then((results) => callback(results))
           .catch((err) => callback(err))
          }
    }