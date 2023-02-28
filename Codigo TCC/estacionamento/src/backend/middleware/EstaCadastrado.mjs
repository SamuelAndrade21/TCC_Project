import BancoParking from "../server.mjs"

  export  class EstaCadastrado{

        static async handle(email,callback){
           const connection = await BancoParking.connect()
           let sql = "select * from funcionario where email = ?";
           let query =  connection.query(sql,email,function(err,results,fields){
            
            if(err) throw new Error(err)
            
            callback(results)

           })

           console.log(query.sql)
           connection.end()
    
        }
    } 