import { Deposit } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const depositColumns: ColumnDef<Deposit>[] = [
    {
        header: 'ID',
        accessorKey: 'id'
    },
    {
        header: 'Asset',
        accessorKey: 'asset'
    },
    {
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
     
          return <div className="text-right font-medium">{formatted}</div>
        },
        accessorKey: 'amount'
    },
    {
        header: 'Value',
        accessorKey: 'value'
    },
]

export default depositColumns