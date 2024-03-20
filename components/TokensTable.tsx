import { Token } from "@/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton";
import EmptyResult from "@/components/EmptyResult";
import { Card } from "./ui/card";


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
    {
        label: 'KRW FiendFX',
        symbol: 'KRWFFX',
        value: '0x1234567890',
        engine: '0x1234567890',
        address: '0x1234567890',
        state: 'coming soon'
    },
    {
        label: 'JPY FiendFX',
        symbol: 'JPYFFX',
        value: '0x1234567890',
        engine: '0x1234567890',
        address: '0x1234567890',
        state: 'inactive'
    }
]

const TokensTable = () => {
    const isLoading = false;
    const noData = false;

    if(isLoading) return <Skeleton className="h-36" />

    if(noData) return <div className="h-36"><EmptyResult text="No coins" subText="There are no coins to list" /> </div>

    return (
        <Card>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>State</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((token, index) => (
                    <TableRow key={index}>
                        <TableCell>{token.label}</TableCell>
                        <TableCell>{token.symbol}</TableCell>
                        <TableCell>{token.state}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    {/* Center the value */}
                    <TableCell colSpan={3} align="center">Many more coins to come..</TableCell>
                    {/* <TableCell colSpan={3}>Total: {data.length}</TableCell> */}
                </TableRow>
            </TableFooter>
        </Table>
        </Card>

    )
}

export default TokensTable