import AuthForm from "../../components/AuthForm";

export default function SignInForm(){
    return(
        <div className="h-screen w-screen bg-base-300 flex flex-col justify-center items-center">
            <AuthForm type={"signin"} />
        </div>
    )
}