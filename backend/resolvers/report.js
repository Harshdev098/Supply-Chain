const mysql = require('mysql2/promise')
const db = require('../config/DBconfig')

const HandleReport=async(args)=>{
    const {ProdID,UserID,ManuID,statement}=args
    try{
        const connection=await db.getConnection()
        const query='insert into complaints values(0,?,?,?,?)'
        const [result]=await connection.query(query,[UserID,statement,ManuID,ProdID])
        console.log("result after submiting the report ",result)
        return {status:200}
    }catch(err){
        console.log("an error occured while reporting",err)
        return {status:500}
    }
}

module.exports={ HandleReport }