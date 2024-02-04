'use client'
import { Box, Button, Flex, Heading, Image, useColorModeValue } from '@chakra-ui/react';

export default function Header() {
    const formBackGround = useColorModeValue("gray.100", "gray.700");
    return (
        <Box as="header">
        <Flex
            minH={"30px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle="solid"
            align="center"
        >
            <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
                <Heading as="h1" size="lg">
                    aaa
                </Heading>
                <Flex flex={1} justify="flex-end" maxW="5xl" mx="auto">
                    <Button
                        mb={6}
                        marginRight={2}
                        colorScheme="teal"
                    >
                        Avatars
                    </Button>
                    <Button
                        mb={6}
                        marginRight={2}
                        colorScheme="teal"
                    >
                        Market
                    </Button>
                </Flex>
            </Flex>
        </Flex>
        </Box>
    );
}