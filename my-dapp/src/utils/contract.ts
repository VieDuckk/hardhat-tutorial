import { ethers } from 'ethers';
import TokenABI from '@/abis/MyToken.json';
import StakingPoolABI from '@/abis/StakingPool.json';
import { getProvider, getSigner } from './web3';
import { StakeData } from '../types/contract';

const tokenAddress = '0x7fCd461f6CEb35412F2f729ffb77023A14A6aeaf'; 
const stakingPoolAddress = '0x3b0c1ebBC3F47cD962409b54f4E1498D5b2b009B'; 

const tokenContract = new ethers.Contract(tokenAddress, TokenABI, getSigner() || undefined);
const stakingPoolContract = new ethers.Contract(stakingPoolAddress, StakingPoolABI, getSigner() || undefined);

export const stakeToken = async (walletAddress: string, amount: string): Promise<void> => {
  const provider = await getProvider();
  const signer = await getSigner();
  if (provider && signer) {
    await tokenContract.connect(signer).approve(stakingPoolAddress, ethers.utils.parseUnits(amount, 18));
    await stakingPoolContract.connect(signer).stake(ethers.utils.parseUnits(amount, 18));
  }
};

export const unstakeToken = async (walletAddress: string): Promise<void> => {
  const provider = await getProvider();
  const signer = await getSigner();
  if (provider && signer) {
    await stakingPoolContract.connect(signer).unstake();
  }
};

export const getStakeInfo = async (walletAddress: string): Promise<StakeData> => {
  const provider = await getProvider();
  const signer = await getSigner();
  if (provider && signer) {
    const stakeData = await stakingPoolContract.connect(signer).stakes(walletAddress);
    return {
      amount: ethers.utils.formatUnits(stakeData.amount, 18),
      startTime: stakeData.startTime.toNumber(),
      reward: ethers.utils.formatUnits(await stakingPoolContract.connect(signer).calculateReward(walletAddress), 18),
    };
  }
  return {
    amount: '0',
    startTime: 0,
    reward: '0',
  };
};