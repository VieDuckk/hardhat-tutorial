import { ethers } from 'ethers';
import TokenABI from '@/abis/MyToken.json';
import StakingPoolABI from '@/abis/StakingPool.json';
import { StakeData } from '../types/contract';

const tokenAddress = '0x7fCd461f6CEb35412F2f729ffb77023A14A6aeaf'; 
const stakingPoolAddress = '0x3b0c1ebBC3F47cD962409b54f4E1498D5b2b009B'; 

export const getContracts = (providerOrSigner: ethers.providers.Provider | ethers.Signer) => {
  const tokenContract = new ethers.Contract(tokenAddress, TokenABI, providerOrSigner);
  const stakingPoolContract = new ethers.Contract(stakingPoolAddress, StakingPoolABI, providerOrSigner);
  return { tokenContract, stakingPoolContract };
};

export const stakeToken = async (signer: ethers.Signer, amount: string): Promise<void> => {
  const { tokenContract, stakingPoolContract } = getContracts(signer);
  await tokenContract.approve(stakingPoolAddress, ethers.utils.parseUnits(amount, 18));
  await stakingPoolContract.stake(ethers.utils.parseUnits(amount, 18));
};

export const unstakeToken = async (signer: ethers.Signer): Promise<void> => {
  const { stakingPoolContract } = getContracts(signer);
  await stakingPoolContract.unstake();
};

export const getStakeInfo = async (provider: ethers.providers.Provider, walletAddress: string): Promise<StakeData> => {
  const { stakingPoolContract } = getContracts(provider);
  const stakeData = await stakingPoolContract.stakes(walletAddress);
  const reward = await stakingPoolContract.calculateReward(walletAddress);

  return {
    amount: ethers.utils.formatUnits(stakeData.amount, 18),
    startTime: stakeData.startTime.toNumber(),
    reward: ethers.utils.formatUnits(reward, 18),
  };
};