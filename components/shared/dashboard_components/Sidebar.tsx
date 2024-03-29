import { UserInterface } from "@/db/models/user.model";
import ChangeTeam from "./ChangeTeam";
import React from "react";
import SideNavigation from "./SideNavigation";

interface SidebarProps {
  user: UserInterface | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-10 px-4">
      <div className="w-full">
        <ChangeTeam user={user} />
      </div>

      <div className="w-full">
        <SideNavigation />
      </div>
    </div>
  );
};

export default Sidebar;
