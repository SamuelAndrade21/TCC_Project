import BancoParking from "../server.mjs";

export class GestaoPagamentos{
    static async handle(venda_cabecalho_id, situacao, valor_recebido, troco, callback){

        const connection = await BancoParking.connect()

        let pagamento = "UPDATE VENDA_CABECALHO SET situacao = '"+ situacao +"', valor_recebido = '"+ valor_recebido +"', troco = '"+ troco +"' WHERE venda_cabecalho_id = '" + venda_cabecalho_id +"';"

        connection.query(pagamento, function(err, results, fields){
            if (err) throw new Error(err)

            callback(results)
            connection.end()
        })
    }
}