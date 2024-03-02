import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";

const SideNavigation = () => {
  return (
    <div className="w-full space-y-4">
      <Button className="w-full" asChild>
        <p className="flex items-center justify-center gap-4">
          New File <span className="text-gray-400 text-xs">Alt N</span>
        </p>
      </Button>
      <div className="space-y-2">
        <Progress value={40} />
        <p className="text-sm">
          <span className="font-bold">2</span> out of{" "}
          <span className="font-bold">5</span> files used.
        </p>
        <p className="text-sm">
          <Link href="/upgrade" className="underline underline-offset-4">
            Upgrade
          </Link>{" "}
          your plan for unlimited access.
        </p>
      </div>
    </div>
  );
};

export default SideNavigation;
