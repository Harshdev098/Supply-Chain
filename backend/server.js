const express=require('express')
const cors=require('cors')
const { createHandler }=require('graphql-http/lib/use/express');
const graphql=require('graphql')
const RootMutation=require('./GraphQL/Mutation/Root')
const RootQuery=require('./GraphQL/Query/Root')

const app=express()
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello");
})

app.use('/graphql',createHandler({
    schema:new graphql.GraphQLSchema({
        query:RootQuery,
        mutation:RootMutation
    })
}))

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})