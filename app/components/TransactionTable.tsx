"use client";
import { Transaction, TransactionType } from "@prisma/client";
import { useEffect, useState } from "react";

export default function TransactionTable({ transactionsData, summary }: {
    transactionsData: Transaction[],
    summary: { totalIncome: number, totalExpense: number, incomeCount: number, expenseCount: number }
}) {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    useEffect(() => {
        console.log(transactionsData);
        setTransactions(transactionsData);
    }, [transactionsData])
    return (
        <div className="transactions lg:px-[15%] mt-10">
            <h1 className="text-4xl lg:text-start text-center font-bold mb-2">Transactions</h1>
            <p className="mb-3 text-center lg:text-start">You’ve added {summary.incomeCount} income and made {summary.expenseCount} expense this month.</p>
            <div className="flex flex-col md:flex-row mb-3">
                <div className="filter  gap-x-3.5 w-full">
                    <input className="btn filter-reset" onClick={() => setTransactions(transactionsData)} type="radio" name="metaframeworks" aria-label="All" />
                    <input className="btn" type="radio" onClick={() => filterDates(30, setTransactions, transactions)} name="metaframeworks" aria-label="Last 30 Days" />
                    <input className="btn" type="radio" onClick={() => filterDates(60, setTransactions, transactions)} name="metaframeworks" aria-label="Last 60 Days" />
                    <input className="btn" type="radio" onClick={() => filterDates(365, setTransactions, transactions)} name="metaframeworks" aria-label="Last 365 Days" />
                </div>
                <div className="filter  gap-x-3.5 w-full ">
                    <input className="btn filter-reset" onClick={() => setTransactions(transactionsData)} type="radio" name="metaframeworks" aria-label="All" />
                    <input className="btn" type="radio" onClick={() => filterDates(30, setTransactions, transactions)} name="metaframeworks" aria-label="Sort Amount Ascending" />
                    <input className="btn" type="radio" onClick={() => filterDates(60, setTransactions, transactions)} name="metaframeworks" aria-label="Sort Amount Descending" />
                    <input className="btn" type="radio" onClick={() => filterDates(365, setTransactions, transactions)} name="metaframeworks" aria-label="Sort Dates Ascending" />
                    <input className="btn" type="radio" onClick={() => filterDates(365, setTransactions, transactions)} name="metaframeworks" aria-label="Sort Dates Descending" />
                </div>
            </div>
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
        </div>
    )
}
function filterDates(days: number, setTransactions, allTransactions: Transaction[] | null): void {
    if (!allTransactions) return;
    const now = Date.now();
    const cutoff = now - days * 24 * 60 * 60 * 1000;
    const filtered = allTransactions.filter(t => {
        return new Date(t.date).getTime() >= cutoff;
    });
    setTransactions(filtered);
}