import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://graphql-pokemon2.vercel.app",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Pokemon: {
        keyFields: ["id"], 
      },
      Query: {
        fields: {
          pokemon: {
            keyArgs: ["name"],
            merge: false,
          },
        },
      },
    },
  }),
});