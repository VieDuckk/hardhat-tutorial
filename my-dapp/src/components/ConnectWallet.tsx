"use client"
import { useState, useEffect } from 'react';
import Button from './Button'; // Import the Button component
import { connectWallet, getWalletAddress } from '../utils/web3';

const ConnectWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await getWalletAddress();
      setWalletAddress(address);
    };
    fetchWalletAddress();
  }, []);

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
      const address = await getWalletAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Button
      onClick={handleConnectWallet}
      disabled={isLoading}
      variant={walletAddress ? 'success' : 'primary'} 
      loading={isLoading} 
      text={walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'} 
      
    />
  );
};

export default ConnectWallet;
