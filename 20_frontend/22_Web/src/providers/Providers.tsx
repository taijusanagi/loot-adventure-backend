"use client";
import React from "react";
import WagmiProvider from "./WagmiProvider";
import NextAuthProvider from "./NextAuthProvider";
import { ChakraUiProviders } from "./ChakraUiProvider";
import { ApolloProviders } from "./ApolloProvider"
import theme from '../styles/theme';

type ProviderType = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <WagmiProvider>
      <ChakraUiProviders>
        <ApolloProviders>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ApolloProviders>
      </ChakraUiProviders>
    </WagmiProvider>
  );
};

export default Providers;