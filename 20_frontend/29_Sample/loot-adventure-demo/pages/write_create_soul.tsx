import type { NextPage } from 'next';
import {
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {useState} from "react";
import { soulLootNftAbi } from '../components/abi/soulloot-nft-abi';
import { erc6551RegistryAbi } from '../components/abi/erc6551-registry-abi';
import { SOULLOOT_NFT, NFT_CONTRACT, ERC6551_REGISTRY, ERC6551_ACCOUNT } from '../components/config'
import { useContractEvent, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { watchClientLocal, watchClientMchTestnet } from '../components/clients';

type formInputs = {
    tokenId: number;
    chainId: number;
    salt: number;
}

const CreateSoulTBA:NextPage = () => {
    const [tokenId, setTokenId] = useState(3);
    const [chainId, setChainId] = useState(420); 
    const [salt, setSalt] = useState(1);
    const { getValues, register, formState: { errors, isSubmitting },} = useForm<formInputs>()

    watchClientMchTestnet.watchContractEvent({
        address: ERC6551_REGISTRY,
        abi: erc6551RegistryAbi,
        eventName: 'AccountCreated',
        onLogs: logs => {
            console.log('Approve Event');
            console.log(logs[0]);
        }
    });
    
    const { config } = usePrepareContractWrite({
        address: ERC6551_REGISTRY,
        abi: erc6551RegistryAbi,
        functionName: 'createSoul',
        args: [
            chainId,
            SOULLOOT_NFT,
            tokenId,
            salt,
            '0x0000000000000000000000000000000000000000'
        ]
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    const submitTx = () => {
        const _tokenId = getValues('tokenId');
        setTokenId(_tokenId);
        if(typeof(write) != 'undefined'){ 
            setTimeout(write, 1000);
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
                        <Input {...register('tokenId')} placeholder="Enter Soul-Loot tokenId" />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Chain ID</FormLabel>
                        <Input {...register('chainId')} placeholder="Enter Chain ID" />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Salt</FormLabel>
                        <Input {...register('salt')} placeholder="Enter Salt-Value" />
                    </FormControl>
                    <Button
                        onClick={submitTx}
                        isLoading={isSubmitting} 
                        backgroundColor={'blue'}
                        color={'white'}
                        margin={4}
                    >
                        Create Soul（TBA）
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
                            <p>Check your console(F12)</p>
                        </Box>
                    </div>
                }
            </Box>
        </div>
    )
}

export default CreateSoulTBA;