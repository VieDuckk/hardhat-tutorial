import { ethers } from 'ethers';

let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.providers.JsonRpcSigner | null = null;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async (): Promise<void> => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      await provider.send('eth_requestAccounts', []);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      provider = null;
      signer = null;
    }
  } else {
    provider = null;
    signer = null;
  }
};

export const getWalletAddress = async (): Promise<string | null> => {
  if (signer) {
    return await signer.getAddress();
  }
  return null;
};

export const getProvider = async (): Promise<ethers.providers.Web3Provider | null> => {
  return provider;
};

export const getSigner = (): ethers.providers.JsonRpcSigner | null => {
  return signer;
};