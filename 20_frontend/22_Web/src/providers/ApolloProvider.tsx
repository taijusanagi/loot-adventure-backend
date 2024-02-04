'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

/*
NEXT_PUBLIC_INDEX_ENDPOINT is Subgraph Endpoint
ex) 'https://api.studio.thegraph.com/query/34004/[Project Name]/[Version]'
*/
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_INDEX_ENDPOINT,
})

export function ApolloProviders({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
