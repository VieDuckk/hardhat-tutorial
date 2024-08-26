"use client";
import { useState, useEffect } from 'react';
import { getStakeInfo } from '../utils/contract';
import { FaSpinner } from 'react-icons/fa';
import type { StakeData } from '@/types/contract';
import { useWallet } from '../context/ConnectContext';
import { useProvider } from '../utils/web3';

const StakeInfo: React.FC = () => {
  const { walletAddress } = useWallet();
  const provider = useProvider();
  const [stakeData, setStakeData] = useState<StakeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStakeInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(walletAddress, provider)
        if (walletAddress && provider) {
        console.log(walletAddress, provider)

          const data = await getStakeInfo(provider, walletAddress);
          setStakeData(data);
        } else {
          setError('Wallet not connected or provider not available. Please connect your wallet.');
        }
      } catch (error) {
        console.error('Error fetching stake info:', error);
        setError('Failed to fetch stake information.');
      } finally {
        setLoading(false);
      }
    };

    fetchStakeInfo();
  }, [walletAddress, provider]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">Stake Information</h2>
        <div className="mt-4">
          <p className="text-gray-600"><span className="font-semibold">Wallet Address:</span> {walletAddress}</p>
          <p className="text-gray-600"><span className="font-semibold">Staked Amount:</span> {stakeData?.amount}</p>
          <p className="text-gray-600"><span className="font-semibold">Stake Start Time:</span> {stakeData?.startTime 
              ? new Date(stakeData.startTime * 1000).toLocaleString() 
              : 'N/A'}</p>
          <p className="text-gray-600"><span className="font-semibold">Reward:</span> {stakeData?.reward}</p>
        </div>
      </div>
    </div>
  );
};

export default StakeInfo;