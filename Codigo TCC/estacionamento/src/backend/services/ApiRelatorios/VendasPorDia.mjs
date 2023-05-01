import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class VendasPordDia{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "SELECT d.dia_da_semana, COUNT(vc.valor_total) AS total_vendas FROM ( SELECT 'Domingo' AS dia_da_semana UNION SELECT 'Segunda-feira' UNION SELECT 'Terça-feira' UNION SELECT 'Quarta-feira'  UNION SELECT 'Quinta-feira' UNION SELECT 'Sexta-feira' UNION SELECT 'Sábado') AS d LEFT JOIN venda_cabecalho AS vc  ON d.dia_da_semana = CASE DAYOFWEEK(vc.data_hora_venda)   WHEN 1 THEN 'Domingo'  WHEN 2 THEN 'Segunda-feira'  WHEN 3 THEN 'Terça-feira' WHEN 4 THEN 'Quarta-feira'  WHEN 5 THEN 'Quinta-feira'  WHEN 6 THEN 'Sexta-feira' WHEN 7 THEN 'Sábado' END GROUP BY d.dia_da_semana"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Nenhum valor encontrado")
           }
           
           return results
          
        }

        static  handleWithCallback(callback){
          this.handle()
         .then((results) => callback(results))
         .catch((err) => callback(err))
        }
    } 
