import ConnectWallet from '../components/ConnectWallet';
import StakeForm from '../components/StakeForm';
import UnstakeForm from '../components/UnstakeForm';
import StakeInfo from '../components/StakeInfo';
import AppBackground from "../components/AppBackground";

export default function Home() {
  return (
    <AppBackground>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container text-center flex flex-col items-center justify-center">
          <ConnectWallet />
          <StakeForm />
          <UnstakeForm />
          <StakeInfo />
        </div>
      </div>
    </AppBackground>
  );
}
