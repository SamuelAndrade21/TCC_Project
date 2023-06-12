import BancoParking from "../../server.mjs";
import { promisify } from "util";

 export class ListaFuncionario{
    static async handle(funcionario_id){
        const connection = await BancoParking.connect()
        const sql = "SELECT funcionario_id,nome,email,telefone FROM funcionario WHERE funcionario_id = '" + funcionario_id + "'"
        const query = promisify(connection.query).bind(connection)
        const results = await query(sql)
        connection.end();

        if(results.length === 0){
            throw new Error("Nenhum valor encontrado!")
        }
        return results

    }
    static  handleWithCallback(funcionario_id,callback){
        this.handle(funcionario_id)
       .then((results) => callback(results))
       .catch((err) => callback(err))
      }
  }