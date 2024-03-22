'use client';

import Burn from "@/components/Burn";
import CardsMetric from "@/components/CardMetric";
import ConnectedStatus from "@/components/ConnectedStatus";
import GetStartedCard from "@/components/GetStartedCard";
import HeadingOne from "@/components/HeadingOne";
import { HeadingTwo } from "@/components/HeadingTwo";
import Mint from "@/components/Mint";
import TokensTable from "@/components/TokensTable";
import Trade from "@/components/Trade";
import TransactionsTable from "@/components/TransactionsTable";
import { json } from "stream/consumers";

const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
]

const ethPriceData = [
  { // Saturday, January 21st
    today: 2437.80,
    low: 2385.18,
    average: 2411.49,
  },
  { // Sunday, January 22nd
    today: 2420.04,
    low: 2352.39,
    average: 2386.21,
  },
  { // Monday, January 23rd
    today: 2370.20,
    low: 2309.41,
    average: 2339.80,
  },
  { // Tuesday, January 24th
    today: 2340.14,
    low: 2281.20,
    average: 2310.67,
  },
  { // Wednesday, January 25th
    today: 2320.50,
    low: 2250.13,
    average: 2285.31,
  },
  { // Thursday, January 26th
    today: 2289.23,
    low: 2238.11,
    average: 2263.67,
  },
  { // Friday, January 27th
    today: 2306.90,
    low: 2258.33,
    average: 2282.61,
  },
 ];
 

export default function Home() {
  return (
    <div className="m-3 space-y-6">
      <HeadingOne text="Start Here" subText="Start by minting, alternativly burn or convert" />
      {/* <div className="flex flex-row gap-3">
      <GetStartedCard />
      </div> */}
      <div className="flex gap-3">
        <Mint />
        <Burn />
        <Trade />
      </div>
      <CardsMetric title="Volume" description="Mint Daily Tracker" data={data} />
      <HeadingTwo text="Upcoming Coins" />
      <TokensTable/>
      <HeadingTwo text="Transaction History" />
      <TransactionsTable/>

    </div>
  );
}
