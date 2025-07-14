"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar(){
    const handleLogOut = async()=>{
        signOut({redirect:true,callbackUrl:"/"});
    }
    return(
        <div className="w-full h-26 md:h-18 bg-base-200 navbar items-center px-5" >
             <div className="navbar-start flex items-center h-full gap-x-2">
                <Image src="/Money_Hero_section.png" alt="money" height={100} width={100} />
                <Link href="/dashboard" className="text-3xl font-bold md:block hidden cursor-pointer">Fintrack</Link>
             </div>
             <div className="navbar-end flex items-center h-full gap-x-2">
                <Link href={"/transaction"} type="button" className="btn btn-primary md:btn-lg font-semibold text-white"> Add a transaction</Link>
                <button type="button" onClick={handleLogOut} className="btn btn-primary md:btn-lg font-semibold" >Log Out</button>
             </div>
        </div>
    )
}