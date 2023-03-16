import BancoParking from "../server.mjs"

 
  export  class LoginDeUsuario{

        static async handle(email,callback){
           const connection = await BancoParking.connect()
           let sql = "select funcionario_id,nome,email from funcionario where email = ?"
           let query = connection.query(sql,email,function(err,results,fields){
            if(err) throw new Error(err)
            
            if (results.length === 0) {
                const error = console.log("Email/Senha inválido!")
                callback(error);
                return;
              }

          
              callback(results)
             

           })
           console.log(query.sql)
           connection.end()
    
        }
    } 

