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
import Link from "next/link";
import { loginFormSchema } from "@/lib/form-schemas/login.schema";
import Header from "@/components/shared/landing_components/Header";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthenticationContext";

const Login = () => {
  const router = useRouter();
  const { token } = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { data } = await axios.post("api/v1/auth/login", values);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        location.href = "/dashboard";
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

  if (token) {
    router.push("/");
    return;
  }

  return (
    <>
      <Toaster />
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <Header />

        <p className="text-4xl font-extrabold text-center mt-20">
          Log into Pencil.io
        </p>
        <p className="text-center font-medium">
          New to Pencil ?{" "}
          <Link
            href="/signup"
            className="text-blue-600 underline underline-offset-4"
          >
            Sign up for free
          </Link>
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-screen-md mx-auto p-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} autoComplete="off" />
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
                      placeholder="Password"
                      {...field}
                      autoComplete="off"
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

export default Login;
