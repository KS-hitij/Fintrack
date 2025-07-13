"use client";
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GetStartedButton(){
    
    return(
        <SessionProvider >
            <Btn/>
        </SessionProvider>
    )
}

function Btn(){
    const session = useSession();
    const router = useRouter();
    const handleGetStarted = async()=>{
    if(session.status==="unauthenticated"){
      router.push("/auth/signup");
    }else{
      router.push("/dashboard");
    }
  }
  return(
        <button type="button" onClick={handleGetStarted} className="btn btn-primary btn-lg">Get Started</button>
  )
}