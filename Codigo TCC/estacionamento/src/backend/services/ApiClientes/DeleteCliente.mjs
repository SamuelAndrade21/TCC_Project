import BancoParking from "../../server.mjs";

export class DeleteCliente {
    static async handle(cliente_id, callback){
        const connection = await BancoParking.connect()
        let sql = "UPDATE cliente SET situacao = 0 WHERE CLIENTE_ID = '" + cliente_id + "'"  
        const query = connection.query(sql, function(err, results, fields){
            if (err) throw new Error(err)

            callback(results)
            
        })
        connection.end()
    }
}