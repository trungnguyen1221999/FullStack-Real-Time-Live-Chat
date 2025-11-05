"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router"

// --- Schema Validation ---
const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormValues) => {
    console.log("✅ Form data:", data)
    await new Promise((r) => setTimeout(r, 1000))
    reset()
    alert("Account created successfully!")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
            {/* Title */}
            <div className="flex flex-col items-center gap-2 text-center">
              <img src="/logo.svg" alt="logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your details below to create your account
              </p>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Kai"
                  {...register("firstName")}
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors",
                    "hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none",
                    errors.firstName && "border-red-500 focus:border-red-500 focus:ring-red-200"
                  )}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Nguyen"
                  {...register("lastName")}
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors",
                    "hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none",
                    errors.lastName && "border-red-500 focus:border-red-500 focus:ring-red-200"
                  )}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="kainguyen"
                {...register("username")}
                className={cn(
                  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors",
                  "hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none",
                  errors.username && "border-red-500 focus:border-red-500 focus:ring-red-200"
                )}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className={cn(
                  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors",
                  "hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-200"
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </p>
            </div>

            {/* Password & Confirm */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors",
                      "hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none",
                      errors.password && "border-red-500 focus:border-red-500 focus:ring-red-200"
                    )}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors",
                      "hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none",
                      errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-200"
                    )}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Submit */}
            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </div>

            {/* Sign in */}
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Sign in
              </Link>
            </div>
          </form>

          {/* Image Side */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Signup illustration"
              className="absolute object-cover top-1/2 -translate-y-1/2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="px-6 text-center text-sm text-muted-foreground [&_a]:!underline [&_a]:underline-offset-4 [&_a]:decoration-inherit">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
