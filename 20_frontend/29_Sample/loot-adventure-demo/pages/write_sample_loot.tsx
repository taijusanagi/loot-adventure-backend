import type { NextPage } from 'next';
import {
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { watchClientLocal, watchClientMchTestnet } from '../components/clients';

import { sampleLootV2Abi } from '../components/abi/sample-lootv2-abi';
import { NFT_CONTRACT } from '../components/config';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

type formInputs = {
    to: string;
}
type event = {
    address: string;
    args: object;
    blockHash: string;
    blockNumber: number;
    data: string;
    eventName: string;
    logIndex: number;
    removed: boolean;
    topics: Array<string>;
    transactionHash: string;
    transactionIndex: number
}
const MintSampleLoot:NextPage = () => {
    const [to, setTo] = useState('0x7b718D4Ce6ca83536660a314639559F3d3f6e9e3');
    const [emit, setEmit] = useState<event>();
    // const [emit, setEmit] = useState('');

    const { getValues, register, formState: { errors, isSubmitting },} = useForm<formInputs>()

    watchClientMchTestnet.watchContractEvent({
        address: NFT_CONTRACT,
        abi: sampleLootV2Abi,
        eventName: 'Transfer',
        onLogs: logs => {
            // setEmit(logs[0]);
            console.log(logs[0]);
        }
    })

    const { config } = usePrepareContractWrite({
        address: NFT_CONTRACT,
        abi: sampleLootV2Abi,
        functionName: 'safeMintTemp',
        args:[
            to,
            1007,
            10,11,12,13,14,15,
            [1,2,3,4,5,6],[1,2,3,4],
            1,1,1,1,1,1,1,1,
            [1,1,1]
        ]
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    const submitTx = () => {
        const _to = getValues('to');
        setTo(_to);
        if(typeof(write) != 'undefined'){ 
            setTimeout(write, 2000);
        };
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">Create a Web3 Transaction</h2>
                <p className="text-gray-500 dark:text-gray-400">Fill out the form below to create a new transaction.</p>
            </div>
            <Box m={4}>
                <form>
                    <FormControl mb={5}>
                        <FormLabel>Recipient Address</FormLabel>
                        <Input {...register('to')} placeholder="Enter the recipient's address" />
                    </FormControl>
                    
                    <Button
                        onClick={submitTx}
                        isLoading={isSubmitting} 
                        // type='submit'
                        backgroundColor={'blue'}
                        color={'white'}
                    >
                        Mint Sample Loot
                    </Button>
                </form>
            </Box>
            <Box m={6}>
                {isSuccess && 
                    <div>
                        <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 dark:bg-green-800 dark:border-green-300 dark:text-green-200">
                            <p className="font-semibold">Transaction Submitted!</p>
                            <div>Transaction hash: {JSON.stringify(data)}</div>
                        </div>
                        <Box>
                            <p>Check Your Console</p>
                        </Box>
                    </div>
                }
            </Box>
        </div>
    )
}

export default MintSampleLoot;