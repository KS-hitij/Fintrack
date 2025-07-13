import { NextRequest, NextResponse } from "next/server";
import userRegisterSchema from "@/app/lib/validation/user";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/database/db";

export async function POST(req: NextRequest) {
    const result = await req.json();
    const isValid = userRegisterSchema.safeParse(result);
    if (isValid.success) {
        let existingUser = await prisma.user.findFirst({
            where: {
                email: isValid.data.email
            }
        });
        if (existingUser) {
            return NextResponse.json({ message: "Email already registered", status: 400 });
        }
        existingUser = await prisma.user.findFirst({
            where: {
                username:isValid.data.username
            }
        });
        if (existingUser) {
            return NextResponse.json({ message: "Username already taken", status: 400 });
        }
        const hashedPassword = await bcrypt.hash(isValid.data.password, 10);
        const user = isValid.data;
        user.password = hashedPassword;
        await prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
        return NextResponse.json({ message: "Done", status: 201 });
    } else {
        return NextResponse.json({ message: "Validation Error", status: 400 });
    }
}