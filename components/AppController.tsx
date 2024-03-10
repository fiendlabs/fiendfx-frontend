'use client';

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useAccount } from "wagmi";
import LandingContent from "./LandingContent";
import { Inter, Bungee } from "next/font/google";

const bungee = Bungee({ weight: "400", subsets: ["latin"] });

interface AppDirectorProps {
  children: React.ReactNode;
}

const AppDirector = ({ children }: AppDirectorProps) => {
  const account = useAccount();

  const { isConnected } = account;

  if (!isConnected) {
    return (
      <div className={bungee.className}>
        <LandingContent />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="flex flex-row">
          <NavBar />
          <div>{children}</div>
        </div>
      </div>
    );
  }
};

export default AppDirector;
