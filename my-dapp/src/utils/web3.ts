import { ethers, providers } from 'ethers';
import { useEthersSigner } from './signer'
import { useEthersProvider } from './provider';
import React, { useEffect } from 'react';



export const useWalletAddress = (): string | null => {
  const signer = useEthersSigner();
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (signer) {
        const address = await signer.getAddress();
        setWalletAddress(address);
      }
    };
    fetchAddress();
  }, [signer]);

  return walletAddress;
};

export function useProvider() {
  const provider = useEthersProvider()
  return provider
}

export function useSigner() {
  const signer = useEthersSigner()
  return signer
}