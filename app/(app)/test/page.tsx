"use client";

import { ActivityGoal } from "@/components/ActivityGoal";
import CardsMetric from "@/components/CardMetric";
import { CardsStats } from "@/components/CardStats";
import GoalDrawer from "@/components/GoalDrawer";
import HeadingOne from "@/components/HeadingOne";
import TestDepositCollateralAndMint from "@/components/test/TestDepositCollateralAndMint";
import TestGetHealthFactor from "@/components/test/TestGetHealthFactor";
import TestReadDSCEngine from "@/components/test/TestReadDSCEngine";
import TestReadPrecision from "@/components/test/TestReadPrecision";



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

const cardTitle = "Exercise Minutes"
const CardDescription = "Your exercise minutes are ahead of where you normally are."

const TestPage = () => {

  return (
    <div className="m-3 space-y-3">
      <HeadingOne text="Test Page" subText={`Page for testing components`} />
        <TestDepositCollateralAndMint />
        <TestReadDSCEngine />
        <TestReadPrecision />
        <TestGetHealthFactor />
        <GoalDrawer />
        <ActivityGoal/>
        <CardsStats />
        <CardsMetric title={cardTitle} description={CardDescription} data={data} />
    </div>
  );
};

export default TestPage;
