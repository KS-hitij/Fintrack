"use client";
import { Transaction } from "@prisma/client";

export default function Filters({ setTransactions, transactions, transactionsData }
    : { setTransactions:React.Dispatch<React.SetStateAction<Transaction[] | null>>, 
        transactions: Transaction[] | null, transactionsData: Transaction[] | null, }) {

    return (
        <div className="dropdown mb-8">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-field">Filters</div>
            <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                <li>
                    <div className="dropdown">
                        <div tabIndex={1} role="button" className="btn btn-ghost">Dates</div>
                        <ul tabIndex={1} className="menu dropdown-content bg-base-100 z-2 mt-4 w-52 p-2 shadow-sm" >
                            <li onClick={() => { filterDates(30, setTransactions, transactionsData) }} >Past 30 Days</li>
                            <li onClick={() => { filterDates(60, setTransactions, transactionsData) }}>Past 60 Days</li>
                            <li onClick={() => { filterDates(365, setTransactions, transactionsData) }}>Past 365 Days</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="dropdown">
                        <div tabIndex={2} role="button" className="btn btn-ghost rounded-field">Sort</div>
                        <ul tabIndex={2} className="menu dropdown-content bg-base-100 z-2 mt-4 w-52 p-2 shadow-sm" >
                            <li onClick={() => { sortAscending(setTransactions, transactions, "Amount") }} >Amount Ascending</li>
                            <li onClick={() => { sortDescending(setTransactions, transactions, "Amount") }}>Amount Descending</li>
                            <li onClick={() => sortAscending(setTransactions, transactions, "Date")}>Dates Ascending</li>
                            <li onClick={() => sortDescending(setTransactions, transactions, "Date")}>Dates Descending</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

function filterDates(days: number, setTransactions:React.Dispatch<React.SetStateAction<Transaction[] | null>>
    , allTransactions: Transaction[] | null): void {
    if (!allTransactions) return;
    const now = Date.now();
    const cutoff = now - days * 24 * 60 * 60 * 1000;
    const filtered = allTransactions.filter(t => {
        return new Date(t.date).getTime() >= cutoff;
    });
    setTransactions(filtered);
}

function sortAscending(setTransactions:React.Dispatch<React.SetStateAction<Transaction[] | null>>, 
    allTransactions: Transaction[] | null, type: string) {
    if (type === "Amount" && allTransactions) {
        const sorted = [...allTransactions].sort((a, b) => a.amount - b.amount);
        setTransactions(sorted);
    }
    if (type === "Date" && allTransactions) {
        const sorted = [...allTransactions].sort((a, b) => Number(a.date) - Number(b.date));
        setTransactions(sorted);
    }
}
function sortDescending(setTransactions:React.Dispatch<React.SetStateAction<Transaction[] | null>>, 
    allTransactions: Transaction[] | null, type: string) {
    if (type === "Amount" && allTransactions) {
        const sorted = [...allTransactions].sort((a, b) => b.amount - a.amount);
        setTransactions(sorted);
    }
    if (type === "Date" && allTransactions) {
        const sorted = [...allTransactions].sort((a, b) => Number(b.date) - Number(a.date));
        setTransactions(sorted);
    }
}