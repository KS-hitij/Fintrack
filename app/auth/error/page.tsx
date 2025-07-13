"use client";
import { useSearchParams } from "next/navigation";

export default function AuthError(){
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    return(
        <div className="text-red-600 font-semibold h-screen w-screen text-center flex justify-center items-center text-4xl">
            {error ? decodeURIComponent(error).toUpperCase() : "An unknown error occurred"}
        </div>  
    )
}