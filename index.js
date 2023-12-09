import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone' //just to start server to listen to request
import {typeDefs} from './schema.js'
import db from './_db.js'

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(parent, args, context) { //parent resolver, args -- argument, context object such as authentication
            return db.games.find(g => g.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(parent, args, context) { 
            return db.reviews.find(r => r.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(parent, args, context) { 
            return db.authors.find(a => a.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(r=> r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(r => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id)
        },
        game (parent) {
            return db.games.find(g => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(parent, args, context) {
            db.games = db.games.filter(g => g.id !== args.id)
            
            return db.games
        },
        addGame(parent, args, context) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(parent, args, context) {
            db.games = db.games.map(g => {
                if(g.id === args.id) {
                    return {...g, ...args.edits}
                }
                return g
            })
            return db.games.find(g=>g.id === args.id)
        }
    }
}

/*
games {
    title
}
*/
//server setup
const server = new ApolloServer({
    //typeDefs -- definitions of types of data 
    typeDefs,
    //resolvers -- bunch of resolver function how we spawn the query
    resolvers
})

const {url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log('Server ready at port 4000')