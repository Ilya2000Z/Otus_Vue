import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
} from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP ?? 'http://localhost:4000/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS ?? 'ws://localhost:4000/graphql',
  })
)

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  link: link as ApolloLink,
  cache: new InMemoryCache(),
})
