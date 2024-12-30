const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql')
const { handleRegisteration, handleLogin } = require('../../resolvers/register')

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        Register: {
            type: new GraphQLObjectType({
                name: 'RegisterResponse',
                fields: {
                    message: { type: GraphQLString },
                    status: { type: GraphQLID },
                },
            }),
            args: {
                name: { type: GraphQLString },
                oid: { type: GraphQLInt },
                email: { type: GraphQLString },
                contact: { type: GraphQLInt },
                password: { type: GraphQLString },
                metamaskID: { type: GraphQLString }
            },
            resolve: async(_,args)=>{
                return await handleRegisteration(args);
            }
        },
        Login: {
            type: new GraphQLObjectType({
                name: 'LoginResponse', 
                fields: {
                    status: { type: GraphQLID },
                    token: { type: GraphQLString },
                },
            }),
            args: {
                password: { type: GraphQLString },
                metamaskID: { type: GraphQLString }
            },
            resolve: async(_,args)=>{
                return await handleLogin(args);
            }
        }
    }
})

module.exports = RootMutation;