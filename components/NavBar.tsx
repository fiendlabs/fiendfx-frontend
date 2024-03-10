'use client';

import { cn } from "@/lib/utils";
import { Flame, FlaskConical, Home, Plus, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";


const routes = [
    {
      icon: Home,
      href: "/dashboard",
      label: "Home",
      pro: false,
    },
    {
      icon: Plus,
      href: "/mint",
      label: "Mint",
      pro: true,
    },
    {
      icon: Flame,
      href: "/burn",
      label: "Burn",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
  ];

const NavBar = () => {
    const router = useRouter();
    const pathName = usePathname();

const onNavigate = (url: string) => {
    console.log(url)
    router.push(url)    
}

return (
    <div className="space-y-4 flex flex-col text-primary">
      <div className="p-3 flex flex-1 justify-center">
        <div className=" space-y-2">
          {routes.map((route, index) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href)}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathName === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
