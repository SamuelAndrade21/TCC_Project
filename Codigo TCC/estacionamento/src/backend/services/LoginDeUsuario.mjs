import BancoParking from "../server.mjs"
 
  class LoginDeUsuario extends BancoParking{

        static handle(callback){
           const connection = BancoParking.connect() 
           let sql = 'select nome,email,senha from funcionario'
           let query = connection.query(sql,function(err,results,fields){
            if(err) throw new Error(err)

            callback(results)

           })
           console.log(query.sql)
           connection.end()
    
        }
    }

LoginDeUsuario.handle((cars)=>{
    cars.map(car =>{
        console.log(car)
    })
})
 