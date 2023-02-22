
import mysql from 'mysql'


export default class BancoParking{

    static connect(){
        const connection = mysql.createConnection({
            host:'localhost',
            user: 'root',
            password:'1234',
            database: 'park'
        })

        connection.connect()

        return connection
    }  

}



