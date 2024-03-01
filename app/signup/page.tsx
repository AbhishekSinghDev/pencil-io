"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Header from "@/components/shared/landing_components/Header";

import Link from "next/link";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { signupFormSchema } from "@/lib/form-schemas/signup.schema";

const Signup = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      const { data } = await axios.post("api/v1/auth/signup", values);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
        return;
      }
      toast.error("server unavailable");
    } catch (err: any) {
      const error = err as AxiosError;
      const data: any = error.response?.data;
      if (data?.message) {
        toast.error(data.message);
        return;
      }
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] space-y-4">
        <Header />

        <p className="text-4xl font-extrabold text-center mt-20">
          Signup to Pencil.io
        </p>
        <p className="text-center font-medium">
          Already a user ?{" "}
          <Link
            href="/login"
            className="text-blue-600 underline underline-offset-4"
          >
            Login here
          </Link>
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-screen-md mx-auto p-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="What others will see" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="Work email works best" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password (at least of 8 letters)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Signup;
