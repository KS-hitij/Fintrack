"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import userRegisterSchema from "../lib/validation/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function AuthForm({ type }: { type: string }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleSignUp = async()=>{
        if(type!="signup"){
            return;
        }
        const result = userRegisterSchema.safeParse({ email, password, username,firstName,lastName });
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            if (errors.firstName) {
                setToastMessage(errors.firstName[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
            if (errors.lastName) {
                setToastMessage(errors.lastName[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
            if (errors.username) {
                setToastMessage(errors.username[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
            if (errors.email) {
                setToastMessage(errors.email[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
            if (errors.password) {
                setToastMessage(errors.password[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
        }
        const res = await axios.post("/api/auth/signup",result.data);
        if(res.data.status===201){
            router.push("/");
        }else {
            setToastMessage(res.data.message);
            setToast(true);
            setTimeout(()=>setToast(false),1500);
            return;
        }
    }
    const handleSignIn = async () => {
        if (type !== "signin") {
            return;
        }
        const result = userRegisterSchema.partial().safeParse({ email, password });
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            if (errors.email) {
                setToastMessage(errors.email[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
            if (errors.password) {
                setToastMessage(errors.password[0]);
                setToast(true);
                setTimeout(()=>setToast(false),1500);
                return;
            }
        }
        const res = await signIn("credentials",{redirect:false,callbackUrl:"/",email:email,password:password});
        if(res?.error){
            setToastMessage(res.error.toUpperCase());
            setToast(true);
            setTimeout(()=>setToast(false),1500);
            return;
        }
    }
    const handleContinueGoogle = async()=>{
        const res  = await signIn("google",{
            redirect:false,
            callbackUrl:"/dashboard"
        });
        if(res?.error){
            setToastMessage(res.error.toUpperCase());
            setToast(true);
            setTimeout(()=>setToast(false),1500);
            return;
        }
    }
    return (
        <form className="bg-base-100 w-full md:w-[25%] h-full md:h-120 flex flex-col gap-y-7 py-10 items-center rounded-4xl justify-center">
            <h1 className=" text-2xl font-bold md:text-xl md:font-semibold mb-5">{type === "signup" ? "Sign up" : "Sign in"} with Credentials</h1>
            {type === "signup" &&
                <div className="flex gap-x-3">
                    <input type="text" onChange={(e) => setFirstName(e.target.value)} className="input w-full" placeholder="First Name" />
                    <input type="text" onChange={(e) => setLastName(e.target.value)} className="input w-full" placeholder="Last Name" />
                </div>
            }
            {type === "signup" && <input type="text" onChange={(e) => setUsername(e.target.value)} className="input" placeholder="username" />}
            <input type="text" onChange={(e) => setEmail(e.target.value)} className="input" placeholder="email" />
            <input type="text" onChange={(e) => setPassword(e.target.value)} className="input" placeholder="password" />
            <button type="button" onClick={ type=="signin"?handleSignIn:handleSignUp} className="btn btn-primary">{type === "signup" ? "SignUp" : "SignIn"}</button>
            <button type="button" onClick={handleContinueGoogle} className="flex items-center border-1 p-4 rounded-4xl btn">
                <Image src="https://www.google.com/favicon.ico" alt="Google" unoptimized width={32} height={12} />
                Contine with Google
            </button>
            <div className="toast">
                <div className={`alert alert-warning ${toast?"block":"hidden"}`}>
                    <span className="font-semibold">{toastMessage}</span>
                </div>
            </div>
            <p>{type==="signup"?"Already Have an account?":"Register with a account"} <Link className=" underline " href={`${type==="signup"?"/auth/signin":"/auth/signup"}`}>{type==="signup"?"Sign In":"Sign Up"}</Link></p>
        </form>
    )
}
