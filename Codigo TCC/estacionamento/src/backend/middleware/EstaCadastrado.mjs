import BancoParking from "../server.mjs"

  export  class EstaCadastrado{

        static async handle(email,callback){
           const connection = await BancoParking.connect()
           let sql = "select * from funcionario where email = '" + email + "';"
           let query =  connection.query(sql,email,function(err,results,fields){
            
            if(err) throw new Error(err)

            
            //Verifica se o resultado entrego ao menos um valor
            if(results[0]){
               console.log("Usuário já cadastrado!")   
               callback(null,err)
               return;
            }


            //Concatena o email com o resultado caso não encontre nenhum valor no SELECT 
            else{
             results += email
             console.log("Novo usuário cadastrado com sucesso!")
             callback(results,null)
            }   

           })

           console.log(query.sql)
           connection.end()
    
        }
<<<<<<< Updated upstream
    } 
=======
    } 
>>>>>>> Stashed changes
