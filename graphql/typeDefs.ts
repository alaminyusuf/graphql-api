import { gql } from 'apollo-server-hapi'

const typeDefs = gql`
    type User {
        name: String!
        age: Int!
    }
`
export default typeDefs
