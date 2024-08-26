"use client";

import ConnectWallet from "../components/ConnectWallet";
import StakeForm from "../components/StakeForm";
import UnstakeForm from "../components/UnstakeForm";
import StakeInfo from "../components/StakeInfo";
import AppBackground from "../components/AppBackground";
import { Providers } from "./Provider";
import "@rainbow-me/rainbowkit/styles.css";
import { WalletProvider } from "@/context/ConnectContext";

export default function HomePage() {
  return (
    <Providers>
      <WalletProvider>
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
      </WalletProvider>
    </Providers>
  );
}
