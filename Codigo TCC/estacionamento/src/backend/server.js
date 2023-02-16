const express = require('express')

const mysql = require('mysql')

const app = express()

export  default class BancoParking{


    static connection(){
        const connect = mysql.createConnection({
            host:'localhost',
            user: 'root',
            password:'1234',
            database: 'park'
        })

        connect.connect()

        if(error){
            throw error;
        } else {
            console.log('MySQL Database is connected Successfully');
        }


        return connect
    }
    

}




