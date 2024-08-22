"use client";
import { useState } from 'react';
import Button from './Button'; // Adjust the path if needed
import { unstakeToken } from '../utils/contract';
import { getWalletAddress } from '../utils/web3';

const UnstakeButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUnstake = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const walletAddress = await getWalletAddress();
      if (walletAddress) {
        await unstakeToken(walletAddress);
        setMessage({ type: 'success', text: 'Tokens unstaked successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Wallet not connected. Please connect your wallet.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to unstake tokens. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        onClick={handleUnstake}
        disabled={isLoading}
        variant="danger"
        loading={isLoading}
        text={isLoading ? 'Unstaking...' : 'Unstake Tokens'}
      />
      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default UnstakeButton;
