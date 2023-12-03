'use client'
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { getCsrfToken, signIn } from "next-auth/react";
import { Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const formBackGround = useColorModeValue("gray.100", "gray.700");
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected/dungeon";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address as `0x${string}`,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const response = await signIn("siwe", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl,
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <main>
      {!isConnected && <w3m-button />}
      {isConnected && (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={formBackGround} p={12} rounded={6}>
          <Heading mb={6}>Lets Start</Heading>
          <Button 
            mb={6} 
            colorScheme="teal"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Flex>
      </Flex>
      )}
    </main>
  );
}
