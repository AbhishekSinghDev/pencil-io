import { useAuth } from "@/components/context/AuthenticationContext";
import { useDashboard } from "@/components/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const SideNavigation = () => {
  const { selectedTeam } = useDashboard();
  const { token } = useAuth();
  const team_id = selectedTeam?._id;

  const handleNewFile = async () => {
    try {
      const { data } = await axios.post(
        "api/v1/project/create-project",
        {
          team_id: team_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(data.message);
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (err) {
      const error = err as AxiosError;
      const data: any = error.response?.data;
      if (data?.message) {
        toast.error(data.message);
        return;
      }
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full space-y-4">
        <Button className="w-full" asChild>
          <p
            className="flex items-center justify-center gap-4 cursor-pointer"
            onClick={handleNewFile}
          >
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
    </>
  );
};

export default SideNavigation;
