import BancoParking from "../server.mjs";

export class CriaVenda{
    static async handle(id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada, callback ){

        const connection = await BancoParking.connect()

        let venda = "INSERT INTO VENDA_CABECALHO (id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada ) values ( '"+ id_funcionario +"', '"+ id_cliente +"', '"+ situacao +"','"+ valor_venda +"','"+ valor_total +"', '"+ valor_recebido +"', '"+ troco +"', '"+ venda_cancelada +"');"

        connection.query(venda, function(err, results, fields){
            if (err) throw new err

            callback(results)
            connection.end()
        })
    }
}

