import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InviteIcon from "@/public/icons/invite.svg";
import Image from "next/image";

import React from "react";

const DashboardNavbar = () => {
  return (
    <div className="h-20 flex items-center justify-end gap-4 lg:px-16 px-10">
      <div>
        <Input placeholder="search" />
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Button size="sm" asChild>
          <div className="flex gap-2">
            <Image
              src={InviteIcon}
              alt="invite"
              height={50}
              width={50}
              className="h-3 w-3 invert dark:invert-0"
            />
            Invite
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
