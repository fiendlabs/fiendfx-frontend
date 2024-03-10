"use client";
import { APP_NAME } from "@/lib/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    // Header will be fixed at the top of the page and have minium height
    <div className="h-18">
      <div className="border-b border-primary/10">
        <div className="mx-3 my-2 flex justify-between">
          <div className=" text-3xl font-bold text-primary">{APP_NAME}</div>
          <div className="flex flex-none justify-end">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
