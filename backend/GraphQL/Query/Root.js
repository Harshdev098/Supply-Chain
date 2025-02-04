const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql');
const { showProduct } = require('../../resolvers/product');
const {fetchtotalParams}=require('../../resolvers/params')


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ProfileData: {
            type: GraphQLString,
            resolve: () => {
                return 'abcd';
            }
        },
        ProductDetails: {
            type: new GraphQLObjectType({
                name: 'ProjectResponse',
                fields: {
                    productID: { type: GraphQLInt },
                    date: { type: GraphQLString },
                    ManuName: { type: GraphQLString },
                    Pname: { type: GraphQLString },
                    creator: { type: GraphQLString},
                    status: { type: GraphQLInt}
                }
            }),
            args: {
                id: { type: GraphQLInt },
                creator: { type: GraphQLString }
            },
            resolve: async (_, args, context) => {
                return await showProduct(args, context)
            }
        },
        FetchMainData:{
            type:new GraphQLObjectType({
                name:"MainDataResponse",
                fields:{
                    // compleintID:{type:GraphQLInt},
                    // projID:{type:GraphQLInt},
                    // projName:{type:GraphQLString},
                    // user:{type:GraphQLString},
                    // statement:{type:GraphQLString}
                    count:{type:GraphQLInt}
                }
            }),
            resolve:async(_,__,context)=>{
                const total=await fetchtotalParams(context)
                return {count:total};
            }
        }
    }
})

module.exports = RootQuery;