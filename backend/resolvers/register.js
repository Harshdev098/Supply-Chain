const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const db = require('../config/DBconfig')

const handleRegisteration = async (args) => {
    const { name, oid, email, contact, password, metamaskID } = args
    const hashpassword=bcrypt.hash(password,10)
    const connection = await db.getConnection()
    try {
        const searchquery = 'select * from Manufacturer where OID=?'
        const result = await connection.query(searchquery, [oid])
        if (result[0].length !== 0) {
            console.log('result',result)
            return { message: 'User already registered', status: 405 };
        }
        else {
            const insertQuery = 'insert into Manufacturer values(?,?,?,?,?,?)'
            const [result2] = await connection.query(insertQuery, [name, oid, email, contact, password, metamaskID])
            if ([result2]) {
                console.log('result2',[result2])
                return { message: 'User registered successfully', status: 200 };
            }
        }
    } catch (err) {
        console.log("an error occured while registeration",err)
        return { message: 'An error occured', status: 401 };
    }finally{
        connection.release()
    }
}

const handleLogin = async (args) => {
    const { password, metamaskID } = args;
    const connection =await db.getConnection()
    try {
        const searchQuery = 'select * from Manufacturer where metamaskID=?'
        const [result] = await connection.query(searchQuery, [metamaskID])
        if ([result].length !== 0) {
            const hashpassword = result[0].password;
            if (await bcrypt.compare(password, hashpassword)) {
                return { token: 'dfsdfsd', status: 200 };
            }
            else {
                return { token: '', status: 401 }
            }
        }
        else{
            return { token: '', status: 404 };
        }
    } catch (err) {
        console.log("an error occured while logging in",err)
        return { token: '', status: 404 };
    }finally{
        connection.release()
    }
}

module.exports = { handleRegisteration, handleLogin }