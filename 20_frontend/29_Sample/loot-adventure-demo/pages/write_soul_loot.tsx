import type { NextPage } from 'next';
import {
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
    Textarea,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {useState} from "react";
import { sampleLootV2Abi } from '../components/abi/sample-lootv2-abi';
import { soulLootNftAbi } from '../components/abi/soulloot-nft-abi';
import { SOULLOOT_NFT, NFT_CONTRACT } from '../components/config';
import { useContractEvent, useWalletClient, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi';
import { watchClientLocal, watchClientMchTestnet } from '../components/clients';

type formInputs = {
    tokenId: number;
}

const MintSoulLoot:NextPage = () => {
    const [lootNft, setLootNft] = useState(NFT_CONTRACT);
    const [tokenId, setTokenId] = useState(10);
    const [approved, setApproved] = useState(true);
    const { getValues, register, formState: { errors, isSubmitting },} = useForm<formInputs>()

    const approveEvent = watchClientMchTestnet.watchContractEvent({
        address: NFT_CONTRACT,
        abi: sampleLootV2Abi,
        eventName: 'Approval',
        onLogs: logs => {
            console.log('Approve Event');
            console.log(logs[0]);
        }
    })
    
    const soulLootEvent = watchClientMchTestnet.watchContractEvent({
        address: SOULLOOT_NFT,
        abi: soulLootNftAbi,
        eventName: 'mintSoulLoot',
        onLogs: logs => {
            console.log('SoulLoot Event');
            console.log(logs[0]);
        }
    });
    
    const { config } = usePrepareContractWrite({
        address: SOULLOOT_NFT,
        abi: soulLootNftAbi,
        functionName: 'safeMint',
        args: [NFT_CONTRACT, tokenId]
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    const submitTx = () => {
        const _tokenId = getValues('tokenId');
        setTokenId(_tokenId);
        console.log(_tokenId);
        console.log(typeof(write));
        console.log(approved);
        write()
        if(typeof(write) != 'undefined'){ 
            setTimeout(write, 1000);
            setApproved(true);  
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
                        <FormLabel>Token ID</FormLabel>
                        <Input {...register('tokenId')} placeholder="Enter the Loot-Nft tokenId" />
                    </FormControl>
                    <Button
                        onClick={submitTx}
                        isLoading={isSubmitting} 
                        backgroundColor={'blue'}
                        color={'white'}
                        disabled={!approved}
                        margin={4}
                    >
                        Approve Loot-Nft
                    </Button>
                    <Button
                        onClick={submitTx}
                        isLoading={isSubmitting} 
                        backgroundColor={'blue'}
                        color={'white'}
                        disabled={approved}
                        margin={4}
                    >
                        Mint Soul-Loot Nft
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
                            <p>Check your console</p>
                        </Box>
                    </div>
                }
            </Box>
        </div>
    )
}

export default MintSoulLoot;