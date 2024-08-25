"use client"
import { useState } from 'react';
import Button from './Button';
import { connectWallet, getWalletAddress } from '../utils/web3';
import { useWallet } from '../context/ConnectContext';

const ConnectWallet: React.FC = () => {
  const { walletAddress, setWalletAddress } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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