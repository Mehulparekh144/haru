import z from "zod";

export const loginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).refine(
        val => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter"
        }
    ).refine(
        val => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter"
        }
    ).refine(
        val => /[0-9]/.test(val), {
            message: "Password must contain at least one number"
        }
    ).refine(
        val => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
            message: "Password must contain at least one special character"
        }
    )
})

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
    email: z.email(),
    confirmPassword: z.string().min(8),
}).refine(
    data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
)

export type RegisterFormValues = z.infer<typeof registerSchema>;