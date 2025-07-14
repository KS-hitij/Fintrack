"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TransactionType } from "@prisma/client";
export default function TransactionForm({ email }: { email: string }) {
    const router = useRouter();
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [type,setType]= useState<TransactionType | null>(null);
    const [note,setNote] = useState("");
    const [amount,setAmount] = useState(0);
    const amountChange = (amt:string)=>{
        if(amt.length>0){
            setAmount(Number(amt));
        }else{
            setAmount(0);
        }
    }
    const handleAdd = async () => {
        const res = await axios.post(`/api/transaction/${email}`,{type,note,amount});
        if (res.data.status === 200) {
            router.push("/dashboard");
        } else {
            setToastMessage(res.data.message);
            setToast(true);
            setTimeout(()=>setToast(false),1500);
            return;
        }
    }
    return (
        <form className="bg-base-100 w-full md:w-[25%] h-full md:h-120 flex flex-col gap-y-7 py-10 items-center rounded-4xl justify-center">
            <h1 className="text-2xl font-bold md:text-xl md:font-semibold mb-5">Add Your Transactions details</h1>
            <input required type="number"  onChange={(e)=>amountChange(e.target.value)} className="input p-3" placeholder="Amount" />
            <textarea onChange={(e)=>setNote(e.target.value)} className="textarea" placeholder="Note"></textarea>
            <select required onChange={(e)=>setType(e.target.value as TransactionType)} title="type" name="type" defaultValue="null" className="select">
                <option disabled={true} value={"null"}>Transaction type</option>
                <option value={TransactionType.EXPENDITURE}>Expense</option>
                <option value={TransactionType.INCOME} >Income</option>
            </select>
            <button type="button" onClick={handleAdd} className="btn btn-primary">Add</button>
            <div className="toast">
                <div className={`alert alert-warning ${toast?"block":"hidden"}`}>
                    <span className="font-semibold">{toastMessage}</span>
                </div>
            </div>
        </form>
    )
}