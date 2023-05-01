import { promisify } from "util";
import BancoParking from "../../server.mjs";



    class ListandoCaixas{
        static async handle()
        {
            const connection = await BancoParking.connect()
            let sql = "SELECT caixa_id, valor_gaveta,CONCAT(DAY(data_hora_fechamento), '/', MONTH(data_hora_fechamento), '/', YEAR(data_hora_fechamento), ' ', HOUR(data_hora_fechamento), ':', MINUTE(data_hora_fechamento), ':', SECOND(data_hora_fechamento)) as data_fechamento FROM caixa"
            const query = promisify(connection.query).bind(connection)
            const results = await query(sql)
             connection.end()

            if(results.length === 0){
                throw new Error("Valor não encontrado")
            }

            return results
        }

        static  handleWithCallback(callback){
            this.handle()
           .then((results) => callback(results))
           .catch((err) => callback(err))
          }
    }

    export { ListandoCaixas }