// pages/top.tsx
import { Grid, Paper } from '@mui/material';
import { useState } from 'react';
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { RPC_URL, MCH_TESTNET } from './const/const';
import { launchpadAbi } from './abi/launchpad-abi';
// import { Address } from 'viem';
const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const NEXT_PUBLIC_LAUNCHPAD_CONTRACT = process.env.NEXT_PUBLIC_LAUNCHPAD_CONTRACT;

const TopPage = () => {
  const [tiles, setTiles] = useState<Array<boolean>>(new Array(16).fill(false));
  const publicClient = createPublicClient({
    chain: MCH_TESTNET,
    transport: http(RPC_URL.POLYGON_MUMBAI),
  });
  
  const account = privateKeyToAccount(`0x${NEXT_PUBLIC_PRIVATE_KEY}` as `0x${string}`);
  const wallet = createWalletClient({
    account,
    chain: MCH_TESTNET,
    transport: http(RPC_URL.MCH_TESTNET),
  });

  const handleTileClick = async (index: number) => {
    const { request } = await publicClient.simulateContract({
      address: NEXT_PUBLIC_LAUNCHPAD_CONTRACT as `0x${string}`,
      abi: launchpadAbi,
      functionName: 'updateRecord',
      account,
      args: [index, index],
    });
    const response = await wallet.writeContract(request);
    console.log(response);

    const newTiles = [...tiles];
    newTiles[index] = !newTiles[index];
    setTiles(newTiles);
  };

  return (
    <div>
      <h1>Top Page</h1>
      <Grid container spacing={2}>
        {tiles.map((tile, index) => (
          <Grid item xs={3} key={index}>
            <Paper
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: tile ? 'blue' : 'grey',
                cursor: 'pointer',
              }}
              onClick={() => handleTileClick(index)}
            >
              {/* タイルの中身 */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopPage;
