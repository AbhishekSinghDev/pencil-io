import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import User, { UserInterface } from "@/db/models/user.model";

import DownArrowIcon from "@/public/icons/down-arrow.svg";
import Logo from "@/public/icons/logo-1.svg";
import SettingsIcon from "@/public/icons/settings.svg";
import TeamIcon from "@/public/icons/team.svg";
import LogoutIcon from "@/public/icons/logout.svg";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamInterface } from "@/db/models/team.model";

interface ChangeTeamProps {
  user: UserInterface | undefined;
}

const ChangeTeam: React.FC<ChangeTeamProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer bg-gray-100 hover:bg-gray-50 py-2 px-10 rounded-md">
          <div className="flex items-center justify-center gap-3">
            <Image
              src={Logo}
              alt="pencil.io"
              height={50}
              width={50}
              className="h-6 w-6"
            />
            <p className="font-bold text-xl line-clamp-1">{user?.username}</p>
            <Image
              src={DownArrowIcon}
              alt="arrow"
              height={50}
              width={50}
              className="h-4 w-4"
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:w-64 w-56">
        <DropdownMenuLabel>
          {user?.teams.length !== 0 ? (
            user?.teams &&
            user.teams.map((team: TeamInterface) => (
              <p
                key={team._id}
                className="bg-blue-600 py-1 px-4 rounded-md text-white font-bold"
              >
                {/* use dashboard context here and update value of team */}
                {team.name}
              </p>
            ))
          ) : (
            <p className="bg-blue-600 py-1 px-4 rounded-md text-white font-bold text-sm">
              Team Name
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Image
              alt="profile"
              src={TeamIcon}
              height={40}
              width={40}
              className="h-4 w-4"
            />
            <p className="text-sm font-medium">Create Team</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Image
              alt="profile"
              src={SettingsIcon}
              height={40}
              width={40}
              className="h-4 w-4"
            />
            <p className="text-sm font-medium">Settings</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Image
              alt="profile"
              src={LogoutIcon}
              height={40}
              width={40}
              className="h-4 w-4"
            />
            <p className="text-sm font-medium">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-start justify-start gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="font-bold line-clamp-1">{user?.username}</p>
              <p className="text-xs line-clamp-1">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeTeam;
