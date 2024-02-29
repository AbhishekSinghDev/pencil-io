"use client";

import React from "react";
import Image from "next/image";

import logo from "@/public/icons/logo-1.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNavigation from "./MobileNavigation";

interface HeaderProps {
  showLinks?: boolean;
  showTryButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLinks, showTryButton }) => {
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
            <ul className="items-center justify-center gap-1 hidden md:flex">
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/" className="lg:text-base text-sm">
                    Use cases
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/" className="lg:text-base text-sm">
                    About
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/" className="lg:text-base text-sm">
                    Pricing
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/" className="lg:text-base text-sm">
                    Contact
                  </Link>
                </Button>
              </li>
            </ul>

            <div className="md:hidden">
              <MobileNavigation />
            </div>
          </>
        )}

        {showTryButton && (
          <div className="items-center justify-center gap-2 hidden md:flex">
            <Button variant="outline" asChild size="sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm">Try Pencil -{">"}</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
