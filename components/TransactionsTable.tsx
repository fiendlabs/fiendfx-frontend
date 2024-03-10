"use client";

import { Transaction } from "@/types";
import DataTable from "@/components/transactions/data-table";
import { transactionColumns } from "@/components/transactions/columns";
import { Skeleton } from "./ui/skeleton";
import EmptyResult from "./EmptyResult";

const transactions: Transaction[] = [
  {
    id: "1",
    amount: 1,
    status: "success",
    timestamp: 1234567890,
    address: "0x1234567890",
  },
  {
    id: "2",
    amount: 2,
    status: "pending",
    timestamp: 1234567890,
    address: "0x1234567890",
  },
  {
    id: "3",
    amount: 3,
    status: "success",
    timestamp: 1234567890,
    address: "0x1234567890",
  },
  {
    id: "4",
    amount: 4,
    status: "success",
    timestamp: 1234567890,
    address: "0x1234567890",
  },
  {
    id: "5",
    amount: 5,
    status: "success",
    timestamp: 1234567890,
    address: "0x1234567890",
  },
  {
    id: "6",
    amount: 6,
    status: "success",
    timestamp: 1234567890,
    address: "0x1234567890",
  },
];

const getData = (): Transaction[] => {
  return transactions;
};

const TransactionsTable = () => {
  const isLoading = false;
  const noData = true;

  const data = getData();

  const renderResults = () => {
    if(isLoading) {
        return <Skeleton className="h-36" />
        } else if (noData) {
            return <div className="h-36"><EmptyResult text="No transactions" subText="you do not have any transactions yet." /> </div>
        }
        return <DataTable columns={transactionColumns} data={data} />
    }



  return (
    <div className="mx-auto">
        {renderResults()}
    </div>
  );
};

export default TransactionsTable;
