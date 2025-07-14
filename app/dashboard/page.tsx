import { getServerSession } from "next-auth";
import AuthOptions from "../api/auth/[...nextauth]/AuthOptions";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import prisma from "../lib/database/db";

import getSummary from "../lib/helper/getSummary";
import SummaryBoard from "../components/Summary";
import TransactionTable from "../components/TransactionTable";

export default async function Dashbord() {
    const session = await getServerSession(AuthOptions);
    if (!session || !session.user?.email) {
        redirect("/auth/signup");
    }
    const user = await prisma.user.findFirst({
        where:{
            email:session.user?.email
        },
        select:{
            id:true
        }
    });
    if(!user){
        return ( <div>User not found</div> );
    }
    const transactions = await prisma.transaction.findMany({
        where:{
            userId:user.id
        },
    });
    const summary = getSummary({transactions});
    return (
        <div className="min-h-screen max-w-screen flex flex-col">
            <Navbar />
            <br />
            <SummaryBoard summary={summary}/>
            <TransactionTable transactionsData={transactions} summary={summary}/>
        </div>
    )
}