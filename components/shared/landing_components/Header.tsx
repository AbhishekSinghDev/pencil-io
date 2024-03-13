"use client";

import React from "react";
import Image from "next/image";

import logo from "@/public/icons/logo-1.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNavigation from "./MobileNavigation";
import { ModeToggle } from "./DarkmodeToggle";
import { useAuth } from "@/components/context/AuthenticationContext";

interface HeaderProps {
  showLinks?: boolean;
  showTryButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLinks, showTryButton }) => {
  const { token } = useAuth();

  return (
    <nav className="p-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-6 my-5">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={logo}
            alt="logo"
            height={1000}
            width={1000}
            className="h-8 w-8"
          />
          <Link href="/" className="font-extrabold text-xl cursor-pointer">
            Pencil.io
          </Link>
        </div>

        {showLinks && (
          <>
            <ul className="items-center justify-center gap-4 hidden md:flex">
              <li>
                <Link
                  href="/"
                  className="lg:text-base text-sm hover:bg-orange-600 py-1 px-2 rounded-md"
                >
                  UseCases
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="lg:text-base text-sm hover:bg-orange-600 py-1 px-2 rounded-md"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="lg:text-base text-sm hover:bg-orange-600 py-1 px-2 rounded-md"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="lg:text-base text-sm hover:bg-orange-600 py-1 px-2 rounded-md"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="md:hidden">
              <MobileNavigation />
            </div>
          </>
        )}

        {showTryButton && (
          <div className="items-center justify-center gap-2 hidden md:flex">
            {!token ? (
              <>
                <Button variant="outline" asChild size="sm">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild><Link href="/">Try Pencil -{">"}</Link></Button>
              </>
            ) : (
              <>
                <Button size="sm" asChild>
                  <Link href="/dashboard">Dashboard -{">"}</Link>
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
