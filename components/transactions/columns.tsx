import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const transactionColumns: ColumnDef<Transaction>[] = [
    {
        header: 'ID',
        accessorKey: 'id'
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
        header: 'Status',
        accessorKey: 'status'
    },
    {
        header: 'Timestamp',
        accessorKey: 'timestamp'
    },
    {
        header: 'Address',
        accessorKey: 'address'
    }
]
