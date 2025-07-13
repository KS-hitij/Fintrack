import {z} from "zod";
const userRegisterSchema = z.object({
    username: z.string().min(3,"Username must be a minimum of 3 characters").max(30),
    firstName: z.string().min(3,"First Name must be a minimum of 3 characters"),
    lastName: z.string().min(3,"Last Name must be a minimum of 3 characters"),
    email:z.string().email(),
    password:z.string().min(6,"Password must be a minimum of 6 characters")
    .regex(/[A-Z]/,"Password must contain at least one uppercase character")
    .regex(/[a-z]/,"Password must contain at least one lowercase character")
    .regex(/[0-9]/,"Password must contain at least one number")
    .regex(/[^0-9a-zA-z]/,"Password must contain at least one speacial character")
    .refine(val=>!val.includes(" "),{message:"Password must not contain any spaces"})
});

export default userRegisterSchema