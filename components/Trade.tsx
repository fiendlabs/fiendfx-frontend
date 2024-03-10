
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

const Trade = () => {
  return (
    <div className=" flex">
      <a
      href="/trade"
      target="_blank"
      >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Trade 🚀</CardTitle>
          <CardDescription>Trade Stables</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <h4 className="text-sm font-medium leading-none">Value in wallet</h4>
          <CardDescription className="text-base"> 0.00 </CardDescription>

          <Separator className="my-4" /> */}

          <Button
          className="w-full"
          variant="secondary"
          disabled
          >Coming Soon</Button>

          {/* <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium leading-none">
              Available to trade
            </h4>
            <CardDescription className="text-base"> 0.00 </CardDescription>
          </div> */}
        </CardContent>
      </Card>
    </a>
    </div>
  );
};

export default Trade;
