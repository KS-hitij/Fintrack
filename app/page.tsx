import Image from "next/image";
import GetStartedButton from "./components/GetStartedButton";

export default function Home() {

  return(
    <div className="h-screen w-screen flex justify-items-center items-center flex-col overflow-y-auto">
      <div className="hero_image w-full flex h-[50rem]">
        <div className="w-[65%] relative ">
          <Image src="/Money_Hero_section.png" alt="Hero_img" fill className="object-cover" />
        </div> 
        <div className="flex flex-col pt-64 items-start gap-y-3 pl-10">
          <h1 className="text-8xl font-semibold">Fintrack</h1>
          <h3 className="text-3xl break-words font-bold">Managing finances has never been easier.</h3>
          <GetStartedButton />
        </div>       
      </div>
      
    </div>
  )
}
