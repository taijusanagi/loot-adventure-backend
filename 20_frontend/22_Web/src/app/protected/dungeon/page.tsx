"use client"
import React from 'react';
import { useEffect} from 'react';
import {useRouter} from 'next/navigation'
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Link from 'next/link';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_INDEX_ENDPOINT,
})

const tokensQuery = `
  query {
    transfers {
        tokenId
    }
  }
`

const avatars = [
  { id: 1, name: 'avatar 1', image: 'https://img.tofunft.com/v2/1/0x6144d927ee371de7e7f8221b596f3432e7a8e6d9/953/720/static.jpg' },
  { id: 2, name: 'avatar 2', image: 'https://img.tofunft.com/v2/1/0x6144d927ee371de7e7f8221b596f3432e7a8e6d9/953/720/static.jpg' },
  // Add more avatars as needed
];

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        client
            .query({
                query: gql(tokensQuery),
            })
            .then((data:any) => console.log('Subgraph data: ', data))
            .catch((err:any) => {
                console.log('Error fetching data: ', err)
            })
    }, []);
    return (
        <Box padding={4}>
            <Heading as="h2" size="lg" marginBottom={4}>
                Select Character
            </Heading>
            <Flex flexWrap="wrap">
                <Heading as="h3" size="lg" marginBottom={4}>
                    Wagmi Cats
                </Heading>
                {avatars.map((avatar) => (
                    <Box
                        key={avatar.id}
                        width={{ base: '100%', sm: '50%', md: '33%', lg: '25%' }}
                        padding={2}
                        cursor="pointer"
                        onClick={() => router.push(`/protected/avatar/${avatar.id}`)}
                        _hover={{ transform: 'scale(1.05)' }}
                    >
                        <Box
                            borderWidth={1}
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                        >
                            <Image src={avatar.image} alt={avatar.name} height={200} width="100%" />
                            <Box padding={4}>
                                <Heading as="h3" size="lg" marginBottom={2}>
                                    {avatar.name}
                                </Heading>
                            </Box>
                        </Box>
                        <Button>Select</Button>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};
