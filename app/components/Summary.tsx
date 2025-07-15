import Image from "next/image"
export default function SummaryBoard({ summary }: { summary: { totalIncome: number, totalExpense: number } }) {
    return (
        <div className="summary-info w-full mt-10 flex flex-col items-center justify-center h-62 gap-y-20 mb-18">
            <div className="flex flex-col gap-y-5 justify-around items-center">
                <div className="flex flex-wrap gap-x-4 md:gap-x-10 lg:gap-x-40 mb-8">
                    <div className="min-w-30 rounded-2xl cursor-pointer shadow-md p-5 hover:scale-105 transition-transform duration-300">
                        <h1 className="text-4xl font-bold text-green-500 mb-2">Income</h1>
                        <h3 className="flex items-center justify-center gap-x-2 text-center font-semibold text-2xl"><Image height={24} width={24} src={"/money_gain.png"} alt="money_lose" />{summary.totalIncome}</h3>
                    </div>
                    <div className="min-w-30 rounded-2xl cursor-pointer shadow-md p-5 hover:scale-105 transition-transform duration-300">
                        <h1 className="text-4xl font-bold text-red-600 mb-2">Expenses</h1>
                        <h3 className=" flex items-center justify-center gap-x-2 text-center font-semibold text-2xl pl-4  "><Image height={24} width={24} src={"/money_lose.png"} alt="money_lose" />{summary.totalExpense}</h3>
                    </div>
                </div>
                <div className={`w-90  rounded-2xl shadow-md px-2 py-1.5 flex flex-col justify-center items-center min-h-36 cursor-pointer 
                    hover:scale-105 transition-transform duration-300 
                    ${summary.totalIncome - summary.totalExpense > 0 ? "text-green-600" : "text-red-700"}`}>
                    <h1 className={`text-4xl font-bold mb-2`}>Net Balance</h1>
                    <div className="radial-progress" style={{ "--value": getPercent(summary) } as React.CSSProperties} title="progress" role="progressbar">
                        {getPercent(summary)}%
                    </div>
                    <h1>{getPercent(summary)}% of your total money has been expense.</h1>
                </div>
            </div>
        </div>
    )
}
function getPercent(summary: { totalIncome: number, totalExpense: number }){
    const total = summary.totalExpense+summary.totalIncome;
    return ((summary.totalExpense/total)*100).toPrecision(2);
}
