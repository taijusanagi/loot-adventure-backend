"use client"
import React from 'react';

import {useRouter} from 'next/navigation'
import { Box } from '@chakra-ui/react';
import AccountFlow from '../../../../components/AccountFlow'

const avatars = [
  { id: 1, name: 'avatar 1', image: 'https://img.tofunft.com/v2/1/0x6144d927ee371de7e7f8221b596f3432e7a8e6d9/953/720/static.jpg' },
  { id: 2, name: 'avatar 2', image: 'https://img.tofunft.com/v2/1/0x6144d927ee371de7e7f8221b596f3432e7a8e6d9/953/720/static.jpg' },
  // Add more avatars as needed
];

export default function Home() {

    return (
        <Box padding={4}>
             <AccountFlow />

        </Box>
    );
};
