import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { Home } from "lucide-react";

const GetStartedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Learn how to mint, burn and trade stable coins
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="mint" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem
              value="mint"
                id="mint"
              className="peer sr-only"
              aria-label="Mint"
            />
            <Label
              htmlFor="mint"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className=" text-2xl m-2">🍃</div>
              Mint
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="burn"
              id="burn"
              className="peer sr-only"
              aria-label="Burn"
            />
            <Label
              htmlFor="burn"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className=" text-2xl m-2">🔥</div>
              Burn
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="trade"
              id="trade"
              className="peer sr-only"
              aria-label="Trade"
            />
            <Label
              htmlFor="trade"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className=" text-2xl m-2">🚀</div>
              Trade
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default GetStartedCard;
