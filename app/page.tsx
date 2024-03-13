"use client";

import React from "react";

import { useAuth } from "@/components/context/AuthenticationContext";
import Header from "@/components/shared/landing_components/Header";
import { Button } from "@/components/ui/button";

import DemoImage from "@/public/images/demo.webp";
import Image from "next/image";
import Footer from "@/components/shared/landing_components/Footer";
import Link from "next/link";

const Main = () => {
  const { token } = useAuth();

  return (
    <section className="absolute inset-0 h-fit w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
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

        {token ? (
          <Button asChild>
            <Link href="/dashboard">Dashboard -{">"}</Link>
          </Button>
        ) : (
          <Button asChild><Link href="/">Try Pencil -{">"}</Link></Button>
        )}
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
