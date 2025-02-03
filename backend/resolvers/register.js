const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const db = require('../config/DBconfig')
const { GenerateToken } = require('../token')

const handleRegisteration = async (args) => {
    const { name, oid, email, contact, password, metamaskID, option } = args
    const hashpassword = await bcrypt.hash(password, 10)
    const connection = await db.getConnection()
    try {
        const searchquery = `select * from ${option} where OID=?`
        const result = await connection.query(searchquery, [oid])
        if (result[0].length !== 0) {
            console.log("user already exist")
            return { message: 'User already registered', status: 405 };
        }
        else {
            const insertQuery = `insert into ${option} values(?,?,?,?,?,?,?);`
            const [result2] = await connection.query(insertQuery, [0,name, oid, email, contact, hashpassword, metamaskID])
            if ([result2]) {
                console.log("user registered successfully")
                const id=result2.insertId
                const token = GenerateToken({ id: id })
                if (token) {
                    console.log("token during register: ", token)
                    return { message: 'User registered successfully', status: 200, token: token,occurance:`${option}_${id}` };
                } else {
                    connection.rollback()
                    return { token: '', status: 500 };
                }
            }
        }
    } catch (err) {
        console.log("an error occured while registeration", err)
        return { message: 'An error occured', status: 500 };
    } finally {
        connection.release()
    }
}

const handleLogin = async (args) => {
    const { option, password, metamaskID } = args;
    const connection = await db.getConnection()
    try {
        const searchQuery = `select * from ${option} where metamaskID=?`
        const [result] = await connection.query(searchQuery, [metamaskID])
        if (result.length !== 0) {
            console.log("result: ", result.length, result)
            const hashpassword = result[0].password;
            if (await bcrypt.compare(password, hashpassword)) {
                console.log("logined")
                const token = GenerateToken({ id: result[0].id })
                if (token) {
                    console.log("login token: ", token,result[0].id)
                    return { token: token, status: 200, occurance:`${option}_${result[0].id}` };
                } else {
                    return { token: '', status: 500, occurance:'' };
                }
            }
            else {
                return { token: '', status: 401, occurance:'' }
            }
        }
        else {
            return { token: '', status: 404, occurance:'' };
        }
    } catch (err) {
        console.log("an error occured while logging in", err)
        return { token: '', status: 500 };
    } finally {
        connection.release()
    }
}

module.exports = { handleRegisteration, handleLogin }