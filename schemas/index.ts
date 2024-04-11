import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  username: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ChangePasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  old_password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  new_password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});