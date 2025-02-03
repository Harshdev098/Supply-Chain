const db = require('../config/DBconfig')
const { CheckAuthentication } = require('../auth')

const handleProductCreation = async (args, context) => {
    const authResult = await CheckAuthentication(context)
    const userid = authResult.userid
    const { name, creator, number } = args
    console.log(name, creator);
    const connection = await db.getConnection()
    try {
        const query = 'select * from Manufacturer where metamaskID=?'
        const [result] = await connection.query(query, [creator])
        if (result.length != 0) {
            console.log("first result ", result)
            const id = result[0].id
            console.log("id is ", id)
            const insertQuery = 'insert into product(Pname,creator,number) values(?,?,?)'
            const [result2] = await connection.query(insertQuery, [name, id, number])
            const PID = result2.insertId
            console.log("pid is ", PID)
            return { status: 200, id: PID };
        }
        else {
            return { status: 404, id: null }
        }
    } catch (err) {
        console.log("an error occured", err)
        return {status:500, id:null}
    }
}

const showProduct = async (args, context) => {
    const authResult = await CheckAuthentication(context)
    const userid = authResult.userid
    const { id, creator } = args
    console.log("id and creator are ",id,creator)
    try {
        const connection = await db.getConnection()
        const query = 'select pr.*, manu.metamaskID,manu.name from product as pr inner join Manufacturer as manu ON pr.creator = manu.id where number=? and creator=21'
        const [result] = await connection.query(query, [id, userid])
        console.log("result of showproduct function is ", result)
        const productID = result[0].number
        const date = result[0].creationdate
        const ManuName = result[0].name
        const Pname = result[0].Pname
        const status = 200
        console.log(productID,date,ManuName,Pname)
        return { productID, date, ManuName, Pname, creator, status };
    } catch (err) {
        console.log('an error occured ', err)
        return { productID:null, date:null, ManuName:null, Pname:null, creator:null, status:500 }
    }
}


module.exports = { handleProductCreation, showProduct }