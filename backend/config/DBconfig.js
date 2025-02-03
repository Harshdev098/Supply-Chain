const mysql=require('mysql2/promise')
require('dotenv').config()

const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    connectionLimit:100,
    port:process.env.DB_PORT
})

const initConnection=async()=>{
    try{
        const connection=await db.getConnection()
        console.log("Database connected")
    }catch(err){
        console.log("an error occured ",err)
    }
}
initConnection()

module.exports=db