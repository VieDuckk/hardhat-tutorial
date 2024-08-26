"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useWalletAddress } from '../utils/web3';

interface WalletContextType {
  walletAddress: string | null;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
  contract: any | null;
  setContract: React.Dispatch<React.SetStateAction<any | null>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  
  // Gọi hook trực tiếp trong useEffect
  const address = useWalletAddress();

  useEffect(() => {
    setWalletAddress(address);
  }, [address]);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress, contract, setContract }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
