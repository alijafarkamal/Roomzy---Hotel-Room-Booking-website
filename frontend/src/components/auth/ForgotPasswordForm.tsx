import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Failed to send reset email",
          description: errorData.message || "An error occurred.",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Reset email sent!",
          description:
            "If your email exists in our system, you'll receive a password reset link shortly.",
        });
      }
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-600 mt-2">
          Enter your email to reset your password.
        </p>
      </div>

      {!isSubmitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>

            <p className="text-center text-sm mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-roomzy-blue hover:underline font-medium"
              >
                Back to Login
              </Link>
            </p>
          </form>
        </Form>
      ) : (
        <div className="text-center">
          <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
            <p>
              If your email exists in our system, you'll receive a password reset link shortly.
            </p>
          </div>

          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
