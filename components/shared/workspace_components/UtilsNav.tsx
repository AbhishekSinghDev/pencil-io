import { Button } from "@/components/ui/button";

import MenuIcon from "@/public/icons/navigation.svg";
import Image from "next/image";
import Link from "next/link";

const UtilsNav = () => {
  return (
    <ul className="flex items-center justify-center gap-2">
      <li className="border p-2 rounded-md text-sm">Dashboard</li>
      <li className="border p-2 rounded-md text-sm">Export Editor PDF</li>
    </ul>
  );
};

export default UtilsNav;
