const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLInt}=require('graphql')


const RootQuery=new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        ProfileData:{
            type:GraphQLString,
            resolve:()=>{
                return 'abcd';
            }
        }
    }
})

module.exports=RootQuery;