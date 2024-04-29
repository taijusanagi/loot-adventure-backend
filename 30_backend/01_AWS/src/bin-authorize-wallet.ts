import { createPublicClient, http } from 'viem';
import { mchVerceTestnet } from "./config/custom_chains/mch-verce-testnet";
import { RPC_URL } from './const/';
import { soulLootAbi } from "./abi/erc721-soul-loot-abi";
import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
  
const ADDRESS_SOUL_LOOT = process.env.ADDRESS_SOUL_LOOT as `0x${string}`;
const ADDRESS_ERC6551_REGISTRY = process.env.ADDRESS_ERC6551_REGISTRY as `0x${string}`;
const ADDRESS_ERC6551_ACCOUNT = process.env.ADDRESS_ERC6551_ACCOUNT as `0x${string}`;
const CHAIN_ID = parseInt(process.env.CHAIN_ID as string);

interface EventParams {
    "userId": string,
    "eoa": `0x${string}`,
    "signature": `0x${string}`,
    "tokenId": number
}

export const handler = async (event: EventParams) => {
    console.log('event is...', event);

    // Read SoulLoot owner
    const publicClient = createPublicClient({
        chain: mchVerceTestnet,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });
    try {
        const validEoa = await publicClient.verifyMessage({
            address: event.eoa,
            message: 'hello world', 
            signature: event.signature,
        });
        console.log('validEoa: ', validEoa);

        if(!validEoa) {
            return false;
        }
    } catch(e) {
        console.log('Error: validate sign => ',e)
    }

    try {
        const nftOwner = await publicClient.readContract({
            address: ADDRESS_SOUL_LOOT,
            abi: soulLootAbi,
            functionName: 'ownerOf',
            args: [
                event.tokenId
            ]
        });
        console.log('owner of soulLootNft is ', nftOwner);

        if(nftOwner!=event.eoa) {
            return false;
        }
        console.log('tba parameters: ')
        console.log('ERC6551_Registry: ', ADDRESS_ERC6551_REGISTRY)
        console.log('ERC6551_Account: ', ADDRESS_ERC6551_ACCOUNT)
        console.log('ChainId: ', CHAIN_ID)
        console.log('SoulLoot: ', ADDRESS_SOUL_LOOT)
        console.log('TokenId: ', event.tokenId)

        const tbaAddress = await publicClient.readContract({
            address: ADDRESS_ERC6551_REGISTRY,
            abi: erc6551RegistryAbi,
            functionName: 'account',
            args: [
                ADDRESS_ERC6551_ACCOUNT,
                CHAIN_ID,
                ADDRESS_SOUL_LOOT,
                event.tokenId,
                1
            ]
        })
        console.log('TBA from event is... ', event.userId)
        console.log('TBA calculated is...', tbaAddress);

        if(tbaAddress==event.userId) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        console.log('Error: read contract => ',e)
    }
}