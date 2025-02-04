const db = require('../config/DBconfig')
const { CheckAuthentication } = require('../auth')

const fetchtotalParams = async (context) => {
    const authResult = await CheckAuthentication(context)
    const userid = authResult.userid
    try {
        const connection = await db.getConnection()
        const query = 'select count(*) as total from complaints where ManuID=?'
        const [result] = await connection.query(query, [userid])
        console.log("result is ",result)
        console.log("the result is ",result[0].total)
        return result[0].total
    }catch(err){
        console.log("an error occured while fetching number of params",err)
    }
}

module.exports = {fetchtotalParams}