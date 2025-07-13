import { NextRequest, NextResponse } from "next/server";
import transactionRegisterSchema from "@/app/lib/validation/transaction";
import prisma from "@/app/lib/database/db";

export async function POST(req:NextRequest){
    const data = await req.json();
    const isValid = transactionRegisterSchema.safeParse(data);
    if(isValid.success){
        const existingUser = await prisma.user.findFirst({
            where:{
                id:isValid.data.userId
            }
        });
        if(!existingUser){
            return NextResponse.json({message:"No User exists",success:401});
        }
        await prisma.transaction.create({
            data:{
                userId:existingUser.id,
                amount:isValid.data.amount,
                note:isValid.data.note,
                type:isValid.data.type
            }
        })
        return NextResponse.json({message:"Success",status:200})
    }
    return NextResponse.json({message:"Validation error fill values correctly",status:400});
}
