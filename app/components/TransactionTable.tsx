"use client";
import { Transaction, TransactionType } from "@prisma/client";
import { useEffect, useState } from "react";
import Filters from "./Filters";

export default function TransactionTable({ transactionsData, summary }: {
    transactionsData: Transaction[],
    summary: { totalIncome: number, totalExpense: number, incomeCount: number, expenseCount: number }
}) {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    useEffect(() => {
        setTransactions(transactionsData);
    }, [transactionsData])
    return (
        <div className="transactions lg:px-[15%] mt-10">
            <h1 className="text-4xl lg:text-start text-center font-bold mb-2">Transactions</h1>
            <p className="mb-3 text-center lg:text-start">You’ve added {summary.incomeCount} income and made {summary.expenseCount} expense till now.</p>
            <Filters setTransactions={setTransactions} transactions={transactions} transactionsData={transactionsData} />
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="font-black text-lg">
                                <th></th>
                                <th>Transaction id</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions && transactions.map((t) => {
                                return (
                                    <tr key={t.id} className="hover:bg-base-300 cursor-pointer">
                                        <th></th>
                                        <td>{t.id}</td>
                                        <td>{t.date.toLocaleDateString()}</td>
                                        <td className={t.type === TransactionType.EXPENDITURE ? "text-red-600 font-bold" : "text-green-600 font-semibold"}>
                                            {t.type === TransactionType.EXPENDITURE ? `Expense` : "Income"}
                                        </td>
                                        <td>{t.amount}</td>
                                        <td>{t.note}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
