import express from "express";
import {ApolloServer} from 'apollo-server-express'
import cors from 'cors'
import morgan from 'morgan'
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import path from 'path';

const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => ({req, res}),
    playground: true
})

const app = express()
app.set('port', 4100)
app.use(cors())
app.use(morgan('dev'))
app.use('/', express.static(path.resolve('public')))
gqlServer.applyMiddleware({path: '/gql', app})


export default app