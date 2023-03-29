import BancoParking from "../server.mjs"
import { promisify } from 'util'
import { response } from "express"





  export  class EstaCadastrado{

        static async handle(email){
           const connection = await BancoParking.connect()
           let sql = "select funcionario_id,email from funcionario where email = ?"
           let query =  promisify(connection.query).bind(connection)
           const results = await query(sql,email)
           
   
            
            //Verifica se o resultado entrego ao menos um valor
            if(results.length > 0){ 
               console.log("Usuário já cadastrado!")
               connection.query("DELETE t2 FROM funcionario t2, funcionario t1 WHERE t2.funcionario_id > t1.funcionario_id AND t2.email = t1.email")
               response.status(400)
               return;  
            }

            else{
               response.status(200)
               return results
            }
            
      
            }

            static handleWithCallback(email,callback){
               this.handle(email)
               .then((results) => callback(results))
               .catch((err) => callback(err))
            }
        
         }
   

           

   
    
        
     
