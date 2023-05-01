import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class AdicionandoUserTemp{

        static async handle(id_funcionario,id_cliente,id_caixa,situacao){
           const connection = await BancoParking.connect()
           let sql = "INSERT INTO venda_cabecalho (id_funcionario,id_cliente,id_caixa,situacao) VALUES ('" + id_funcionario + "', '" + id_cliente + "' , '" + id_caixa + "','" + situacao + "')"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql,[id_funcionario,id_cliente,id_caixa])
           connection.end();

           if(results.length === 0){
            throw new Error("Não foi possível inserir")
           }
           
           return results
          
        }

        static  handleWithCallback(id_funcionario,id_cliente,id_caixa,situacao,callback){
          this.handle(id_funcionario,id_cliente,id_caixa,situacao)
         .then((results) => callback(results))
         .catch((err) => callback(err))
        }
    } 
