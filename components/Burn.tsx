
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Burn = () => {
  // Mint your stable coins
  return (
    <div className=" flex">
      <a
      href="/burn"
      target="_blank"
      >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Burn 🔥</CardTitle>
          <CardDescription>Burn stables and relaim collateral</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <h4 className="text-sm font-medium leading-none">Value in wallet</h4>
          <CardDescription className="text-base"> 0.00 </CardDescription>

          <Separator className="my-4" /> */}
          <Button
          className="w-full"
          variant="secondary"
          >Redeem</Button>

          {/* <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium leading-none">
              Available to burn
            </h4>
            <CardDescription className="text-base"> 0.00 </CardDescription>
          </div> */}
        </CardContent>
      </Card>
    </a>
    </div>
  );
};

export default Burn;
