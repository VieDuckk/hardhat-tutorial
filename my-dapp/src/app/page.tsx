import ConnectWallet from '../components/ConnectWallet';
import StakeForm from '../components/StakeForm';
import UnstakeForm from '../components/UnstakeForm';
import StakeInfo from '../components/StakeInfo';
import AppBackground from "../components/AppBackground";
import { WalletProvider } from '../context/ConnectContext';

export default function Home() {
  return (
    <AppBackground>
      <WalletProvider>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container text-center flex flex-col items-center justify-center">
          <ConnectWallet />
          <StakeForm />
          <UnstakeForm />
          <StakeInfo />
        </div>
      </div>
      </WalletProvider>
    </AppBackground>
  );
}
