import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CMS_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CMS_ACCESS_TOKEN}`,
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-first',
    },
  },
})

/* 
OLD CLIENT SETUP (kept for reference)

const apolloClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CMS_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CMS_ACCESS_TOKEN}`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-first',
    },
  },
}) */

export default apolloClient
