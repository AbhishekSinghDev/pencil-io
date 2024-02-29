import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="m-4 my-10">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Pencil.io
          </a>
          . All Rights Reserved.
        </span>
        <p>
          Made with ❤ by{" "}
          <Link
            href="https://abhishek-singh-dev.vercel.app/"
            className="underline underline-offset-2"
          >
            Abhishek Singh
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
