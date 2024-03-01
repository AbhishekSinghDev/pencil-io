import { UserInterface } from "@/db/models/user.model";
import ChangeTeam from "./ChangeTeam";
import React from "react";

interface SidebarProps {
  user: UserInterface | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-50 py-10">
      <div>
        <ChangeTeam user={user} />
      </div>

      <div>SideNavigation</div>
    </div>
  );
};

export default Sidebar;
