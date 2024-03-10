"use client";

import Burn from "@/components/Burn";
import CardsMetric from "@/components/CardMetric";
import ConnectedStatus from "@/components/ConnectedStatus";
import GetStartedCard from "@/components/GetStartedCard";
import HeadingOne from "@/components/HeadingOne";
import { HeadingTwo } from "@/components/HeadingTwo";
import LandingContent from "@/components/LandingContent";
import Mint from "@/components/Mint";
import Trade from "@/components/Trade";
import TransactionsTable from "@/components/TransactionsTable";
import { json } from "stream/consumers";
import { Inter, Bungee } from "next/font/google";

const bungee = Bungee({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <div>
        <LandingContent />
      </div>
  );
}
