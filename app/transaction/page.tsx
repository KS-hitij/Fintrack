"use client";
import { useSession } from "next-auth/react";
import TransactionForm from "../components/TransactionForm";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
export default function TransactionPage(){
    return(
        <SessionProvider>
            <Transaction/>
        </SessionProvider>
    )
}
function Transaction(){
    const session = useSession();
    const router = useRouter();
    if(session.status==="unauthenticated"){
        router.push("/auth/signup");
    }
    return(
        <div className="h-screen w-screen bg-base-300 flex flex-col items-center justify-center">
            <TransactionForm email={session.data?.user?.email || ""} />
        </div>
    )
}