import { useState, useCallback, useEffect } from 'react';
import { stakeToken, getStakeInfo } from '../utils/contract';
import { useProvider, useSigner } from '../utils/web3';
import Button from './Button'; 
import { StakeData } from '../types/contract';
import { ethers } from 'ethers';

const StakeForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [stakeInfo, setStakeInfo] = useState<StakeData | null>(null);
  const provider = useProvider();
  const signer = useSigner();

  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (signer) {
        const address = await signer.getAddress();
        console.log(address)
        setWalletAddress(address);
      }
    };
    fetchWalletAddress();
  }, [signer]);

  useEffect(() => {
    const fetchStakeInfo = async () => {
      if (walletAddress && provider) {
        const info = await getStakeInfo(provider, walletAddress);
        setStakeInfo(info);
      }
    };
    fetchStakeInfo();
  }, [walletAddress, provider]);

  const handleStake = useCallback(async () => {
    if (!signer) {
      setMessage({ type: 'error', text: 'Wallet not connected. Please connect your wallet.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    try {
      await stakeToken(signer, amount);
      setAmount('');
      setMessage({ type: 'success', text: 'Tokens staked successfully!' });
      if (walletAddress && provider) {
        const updatedInfo = await getStakeInfo(provider, walletAddress);
        setStakeInfo(updatedInfo);
      }
    } catch (error) {
      console.error('Staking error:', error);
      setMessage({ type: 'error', text: 'Failed to stake tokens. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  }, [amount, signer, walletAddress, provider]);

  return (
    <div className="max-w-md min-h-max mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Stake Tokens</h2>
      {stakeInfo && (
        <div className="mb-4 text-sm text-gray-600">
          <p>Currently Staked: {stakeInfo.amount} Tokens</p>
          <p>Reward: {stakeInfo.reward} Tokens</p>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (parseFloat(amount) > 0) {
            handleStake();
          } else {
            setMessage({ type: 'error', text: 'Amount must be greater than zero.' });
          }
        }}
        className="space-y-4 flex flex-col items-center justify-center"
      >
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount to Stake
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-black"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="text-gray-500 sm:text-sm mr-2">Tokens</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleStake}
          disabled={isLoading || !amount || parseFloat(amount) <= 0 || !walletAddress}
          variant="primary"
          loading={isLoading}
          text="Stake Tokens"
        />
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default StakeForm;