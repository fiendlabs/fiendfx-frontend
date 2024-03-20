import { Token } from "@/types";
import { Skeleton } from "./ui/skeleton";
import EmptyResult from "./EmptyResult";

const data: Token[]= [
    {
        label: 'USD FiendFX',
        symbol: 'USDFFX',
        value: '0x1234567890',
        engine: '0x1234567890',
        address: '0x1234567890',
        state: 'active'
    },
    {
        label: 'EURO FiendFX',
        symbol: 'EURFFX',
        value: '0x1234567890',
        engine: '0x1234567890',
        address: '0x1234567890',
        state: 'coming soon'
    },
]

const TokensTable = () => {
    const isLoading = false;
    const noData = true;

    if(isLoading) return <Skeleton className="h-36" />

    if(noData) return <div className="h-36"><EmptyResult text="No coins" subText="There are no coins to list" /> </div>
}

export default TokensTable