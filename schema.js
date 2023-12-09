export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!
        reviews: [Review!] 
    }
    type Review {
        id: ID!,
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id:ID!): Game
        authors: [Author]
        author(id:ID!): Author
    }

    type Mutation {
        addGame(game: AddGameInput):Game
        deleteGame(id:ID!):[Game]
        updateGame(id:ID!, edits: EditGameInput): Game
    }
    
    input AddGameInput {
        title: String!,
        platform: [String!]!
    }
    input EditGameInput {
        title: String,
        platform: [String!]
    }
`

//types, int, float, string, boolean, ID
//! means it is required
//platform is a array of String
//by defining  platform: [String!]! - 2 ! means that String and array both are required
//Special type is Query is the entry point of the graphQL Query, 