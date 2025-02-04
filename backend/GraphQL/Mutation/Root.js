const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql')
const { handleRegisteration, handleLogin } = require('../../resolvers/register');
const { handleProductCreation } = require('../../resolvers/product')
const {HandleReport}=require('../../resolvers/report')

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        Register: {
            type: new GraphQLObjectType({
                name: 'RegisterResponse',
                fields: {
                    message: { type: GraphQLString },
                    status: { type: GraphQLID },
                    token: { type: GraphQLString },
                    occurance: { type: GraphQLString }
                },
            }),
            args: {
                name: { type: GraphQLString },
                oid: { type: GraphQLString },
                email: { type: GraphQLString },
                contact: { type: GraphQLString },
                password: { type: GraphQLString },
                metamaskID: { type: GraphQLString },
                option: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                return await handleRegisteration(args);
            }
        },
        Login: {
            type: new GraphQLObjectType({
                name: 'LoginResponse',
                fields: {
                    status: { type: GraphQLID },
                    token: { type: GraphQLString },
                    occurance: { type: GraphQLString }
                },
            }),
            args: {
                option: { type: GraphQLString },
                password: { type: GraphQLString },
                metamaskID: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                return await handleLogin(args);
            }
        },
        AddProduct: {
            type: new GraphQLObjectType({
                name: "AddProductResponse",
                fields: {
                    status: { type: GraphQLInt },
                    id: { type: GraphQLInt }
                }
            }),
            args: {
                name: { type: GraphQLString },
                creator: { type: GraphQLString },
                number: { type: GraphQLString }
            },
            resolve: async (_, args, context) => {
                return await handleProductCreation(args, context);
            }
        },
        SubmitComplient: {
            type: new GraphQLObjectType({
                name: "response",
                fields: {
                    status:{type:GraphQLInt}
                }
            }),
            args: {
                ProdID: { type: GraphQLInt },
                UserID: { type: GraphQLString },
                ManuID: { type: GraphQLString },
                statement: { type: GraphQLString }
            },
            resolve:async(_,args)=>{
                return await HandleReport(args)
            }
        }
    }
})

module.exports = RootMutation;