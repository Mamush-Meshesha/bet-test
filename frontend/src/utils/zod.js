import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(6, "Email must be at least 6 characters long")
    .max(50, "Email is too long"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password is too long"),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email format")
      .min(6, "Email must be at least 6 characters long")
      .max(50, "Email is too long"),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number is too long"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password is too long"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long")
      .max(50, "Confirm password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export const resetRequestSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(6, "Email must be at least 6 characters long")
    .max(50, "Email is too long"),
});

export const resetSchema = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password is too long"),
});
