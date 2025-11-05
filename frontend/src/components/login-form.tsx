"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { useAuthStore } from "@/stores/useAuthStore"

// --- Schema Validation ---
const signinSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SigninFormValues = z.infer<typeof signinSchema>

export function SigninForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  })  
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: SigninFormValues) => {
    const { username, password } = data;

    //goi backend de signin
    try{
      await signIn(username, password)
      // Chỉ navigate khi signin thành công
      navigate("/");
    } catch (error){
      // Error đã được handle trong useAuthStore (toast.error)
      // Không navigate, user ở lại trang login
      console.log("Signin failed:", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
            {/* Title */}
            <div className="flex flex-col items-center gap-2 text-center">
                            <img src="/logo.svg" alt="logo" className="h-10 w-10" />

              <h1 className="text-2xl font-bold">Sign in to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your username and password to continue
              </p>
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

            {/* Password */}
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

            {/* Submit */}
            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            {/* Sign up */}
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>

          {/* Image Side */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.png"
              alt="Signin illustration"
              className="absolute object-cover top-1/2 -translate-y-1/2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
