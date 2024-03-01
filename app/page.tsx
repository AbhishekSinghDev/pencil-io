"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/context/AuthenticationContext";
import Header from "@/components/shared/landing_components/Header";
import { Button } from "@/components/ui/button";

import DemoImage from "@/public/images/demo.webp";
import Image from "next/image";
import Footer from "@/components/shared/landing_components/Footer";

const Main = () => {
  const { token } = useAuth();
  const router = useRouter();

  if (token) {
    router.push("/dashboard");
    return;
  }

  return (
    <section className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Header showLinks={true} showTryButton={true} />
      <section className="h-[50lvh] flex flex-col items-center justify-center space-y-6 max-w-screen-xl mx-auto">
        <div className="text-center">
          <p className="sm:text-5xl text-3xl text-blue-700 font-extrabold">
            Documents & Diagrams
          </p>
          <p className="sm:text-5xl text-3xl">for engineering teams</p>
        </div>
        <div className="text-center">
          <p className="px-10 text-sm sm:text-base">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>
        </div>

        <Button>Try Pencil -{">"}</Button>
      </section>

      <section className="grid place-items-center px-6 max-w-screen-xl mx-auto">
        <Image
          src={DemoImage}
          alt="Pencilio demo"
          height={1000}
          width={1000}
          className="h-auto w-auto"
        />
      </section>

      <section className="max-w-screen-xl mx-auto">
        <Footer />
      </section>
    </section>
  );
};

export default Main;
