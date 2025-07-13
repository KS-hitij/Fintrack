import z from "zod";
import { TransactionType } from "@prisma/client";

const transactionRegisterSchema = z.object({
    amount: z.int().min(0,"Amount can not be less than zero"),
    userId: z.string(),
    type: z.nativeEnum(TransactionType),
    note: z.string()
})

export default transactionRegisterSchema;