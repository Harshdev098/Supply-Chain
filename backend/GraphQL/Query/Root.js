const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql');
const { showProduct } = require('../../resolvers/product');


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
        }
    }
})

module.exports = RootQuery;