import http from 'http'
import express from 'express'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { createHandler } from 'graphql-http/lib/use/express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions'
import { typeDefs, createResolvers, startStatusDemo } from './schema.js'

const pubsub = new PubSub()
const resolvers = createResolvers(pubsub)
const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
app.use(cors())
app.use(express.json())

const context = () => ({ pubsub })
app.all('/graphql', createHandler({ schema, context }))

const server = http.createServer(app)
const wss = new WebSocketServer({ server, path: '/graphql' })
useServer({ schema, context }, wss)

const PORT = 4000
server.listen(PORT, () => {
  startStatusDemo(pubsub)
  console.log(`GraphQL HTTP: http://localhost:${PORT}/graphql`)
  console.log(`GraphQL WS:   ws://localhost:${PORT}/graphql`)
})
