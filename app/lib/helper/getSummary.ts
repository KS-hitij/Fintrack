import { Transaction, TransactionType } from "@prisma/client";
export default function getSummary({transactions}:{transactions:Transaction[]}){
    let totalIncome = 0, totalExpense = 0,incomeCount =0,expenseCount = 0;
    transactions.forEach((t)=>{
        if(t.type===TransactionType.EXPENDITURE){
            totalExpense+=t.amount;
            expenseCount++;
        }else{
            totalIncome+=t.amount;
            incomeCount++;
        }
    })
    return{
        totalIncome,totalExpense,incomeCount,expenseCount
    }
}