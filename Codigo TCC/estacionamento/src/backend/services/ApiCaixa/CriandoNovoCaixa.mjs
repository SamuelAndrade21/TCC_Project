import BancoParking from "../../server.mjs"
import { promisify } from 'util'

 
  export  class CriandoNovoCaixa{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql =  "insert into caixa (data_hora_abertura,data_hora_fechamento) values (default,default)"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao cadastrar!")
           }
           
           return results
        }

        static  handleWithCallback(callback){
          this.handle()
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }
    } 
