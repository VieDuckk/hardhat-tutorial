"use client";
import { useState, useEffect } from 'react';
import { getStakeInfo } from '../utils/contract';
import { getWalletAddress } from '../utils/web3';
import { FaSpinner } from 'react-icons/fa'; // Spinner icon
import type { StakeData } from '@/types/contract';

const StakeInfo: React.FC = () => {
  const [stakeData, setStakeData] = useState<StakeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStakeInfo = async () => {
      try {
        const walletAddress = await getWalletAddress();
        if (walletAddress) {
          const data = await getStakeInfo(walletAddress);
          setStakeData(data);
        } else {
          setError('Wallet not connected. Please connect your wallet.');
        }
      } catch (error) {
        setError('Failed to fetch stake information.');
      } finally {
        setLoading(false);
      }
    };

    fetchStakeInfo();
  }, []);

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
          <p className="text-gray-600"><span className="font-semibold">Staked Amount:</span> {stakeData?.amount}</p>
          <p className="text-gray-600"><span className="font-semibold">Stake Start Time:</span>  {stakeData?.startTime 
              ? new Date(stakeData.startTime * 1000).toLocaleString() 
              : 'N/A'}</p>
          <p className="text-gray-600"><span className="font-semibold">Reward:</span> {stakeData?.reward}</p>
        </div>
      </div>
    </div>
  );
};

export default StakeInfo;