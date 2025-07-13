import { getServerSession } from "next-auth";
import AuthOptions from "../api/auth/[...nextauth]/AuthOptions";
import { redirect } from "next/navigation";
export default async function Dashbord(){
    const session = await getServerSession(AuthOptions);
    if(!session){
        redirect("/auth/signup");
    }
    return(
        <h1>Dashboard</h1>
    )
}