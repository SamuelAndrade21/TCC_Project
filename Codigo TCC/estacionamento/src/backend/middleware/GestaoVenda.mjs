import BancoParking from "../server.mjs";

export class CriaVenda{
    static async handle(id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada, callback ){

        const connection = await BancoParking.connect()

        const sql = "INSERT INTO VENDA_CABECALHO (id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada ) values ( '"+ id_funcionario +"', '"+ id_cliente +"', '"+ situacao +"','"+ valor_venda +"','"+ valor_total +"', '"+ valor_recebido +"', '"+ troco +"', '"+ venda_cancelada +"')"

        connection.query(sql, function(err, results, fields){
            if (err) throw new err

            callback(results)
         
        })
           connection.end()
    }
}