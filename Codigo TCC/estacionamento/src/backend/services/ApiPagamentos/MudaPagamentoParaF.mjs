import BancoParking from "../../server.mjs";
import { promisify } from "util";

 export class MudaPagamentoParaF{
    static async handle(tipo_pag_id){
        const connection = await BancoParking.connect()
        const sql = "UPDATE tipo_pagamento SET situacao = 'F' WHERE tipo_pag_id = '" + tipo_pag_id + "'"
        const query = promisify(connection.query).bind(connection)
        const results = await query(sql)
        connection.end();

        if(results.length === 0){
            throw new Error("Nenhum valor encontrado!")
        }
        return results

    }
    static  handleWithCallback(tipo_pag_id,callback){
        this.handle(tipo_pag_id)
       .then((results) => callback(results))
       .catch((err) => callback(err))
      }
  }