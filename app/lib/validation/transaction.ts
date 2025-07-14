import z from "zod";
import { TransactionType } from "@prisma/client";

const transactionRegisterSchema = z.object({
    amount: z.number().min(0,"Amount can not be less than zero"),
    type: z.nativeEnum(TransactionType),
    note: z.string()
})

export default transactionRegisterSchema;