const { DecodeAccessToken }=require('./token')

const CheckAuthentication=async(context)=>{
    console.log("auth function called")
    const authHeader=context.req.headers.authorization
    console.log("authorization header ",authHeader)
    if(!authHeader){
        console.log("Authorization header is missing")
        return {status:401}
    }
    const decodedToken=await DecodeAccessToken(authHeader)
    const userid=decodedToken.id;
    console.log("userid in checkauthentication function is",userid)
    const status=true
    return {userid,status};
}

module.exports={CheckAuthentication}