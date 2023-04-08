import BancoParking from "../../server.mjs";

export class CriaDetalhe {
    static async handle(id_venda_cabecalho, veiculo, modelo, placa, ano, callback){
        
        const connection = await BancoParking.connect()

        let detalhe = "INSERT INTO VENDA_DETALHE(id_venda_cabecalho, veiculo, modelo, placa, ano) values ('"+ id_venda_cabecalho +"', '"+ veiculo +"', '"+ modelo +"','"+ placa +"','"+ ano +"');"

        connection.query(detalhe, function(err, results, fields){
            if (err) throw new err

            callback(results)
            connection.end()
        })
}
}