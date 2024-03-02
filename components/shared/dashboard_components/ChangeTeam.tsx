import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInterface } from "@/db/models/user.model";

import DownArrowIcon from "@/public/icons/down-arrow.svg";
import Logo from "@/public/icons/logo-1.svg";
import SettingsIcon from "@/public/icons/settings.svg";
import LogoutIcon from "@/public/icons/logout.svg";
import AllIcon from "@/public/icons/all.svg";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamInterface } from "@/db/models/team.model";
import CreateTeamDialog from "./CreateTeamDialog";
import { useDashboard } from "@/components/context/DashboardContext";

interface ChangeTeamProps {
  user: UserInterface | undefined;
}

const ChangeTeam: React.FC<ChangeTeamProps> = ({ user }) => {
  const { setSelectedTeam, selectedTeam, teams } = useDashboard();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer bg-slate-200 hover:bg-slate-100 w-full py-2 rounded-md">
            <div className="flex items-center justify-center gap-3">
              <Image
                src={Logo}
                alt="pencil.io"
                height={50}
                width={50}
                className="h-6 w-6"
              />
              <p className="font-bold text-base line-clamp-1">
                {selectedTeam?.name}&apos;s Team
              </p>
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
            {teams && teams?.length !== 0 ? (
              teams.map((team: TeamInterface) => (
                <p
                  key={team._id}
                  className={`py-1 px-4 rounded-md font-bold my-2 cursor-pointer ${
                    selectedTeam?._id === team._id && "bg-blue-600 text-white"
                  }`}
                  onClick={() => setSelectedTeam(team)}
                >
                  {/* use dashboard context here and update value of team */}
                  {team.name}&apos;s Team
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
            <DropdownMenuItem asChild>
              <CreateTeamDialog />
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

      <div className="w-full rounded-md px-4 py-2 bg-slate-100 my-6 border flex items-center justify-start gap-2 font-bold text-sm cursor-pointer">
        <Image
          src={AllIcon}
          alt="all"
          height={50}
          width={50}
          className="w-4 h-4"
        />
        <p>All Files</p>
      </div>
    </>
  );
};

export default ChangeTeam;
