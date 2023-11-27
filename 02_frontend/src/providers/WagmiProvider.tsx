import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { useEffect, useState } from "react";
import {
  arbitrum,
  avalanche,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from "wagmi/chains";

const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  optimism,
  polygonMumbai,
];

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
// const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_APIKEY;

const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

type ProviderType = {
  children: React.ReactNode;
};

export default function WagmiProvider({ children }: ProviderType) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      ) : null}
    </>
  );
}