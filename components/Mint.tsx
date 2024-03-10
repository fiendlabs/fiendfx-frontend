import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Mint = () => {
  // Mint your stable coins
  return (
    <div className=" flex">
      <a
      href="/mint"
      target="_blank"
      >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Mint 🍃</CardTitle>
          <CardDescription>Mint and borrow stable coin</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <h4 className="text-sm font-medium leading-none">Value in wallet</h4>
          <CardDescription className="text-base"> 0.00 </CardDescription>

          <Separator className="my-4" /> */}
          <Button
          className="w-full"
          >Deposit</Button>


          {/* <div className="flex justify-between items-center"> */}
            
            {/* <h4 className="text-sm font-medium leading-none">
              Available to mint
            </h4>
            <CardDescription className="text-base"> 0.00 </CardDescription> */}
          {/* </div> */}
        </CardContent>
      </Card>
    </a>
    </div>
  );
};

export default Mint;
