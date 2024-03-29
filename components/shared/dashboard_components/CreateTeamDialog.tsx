"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import TeamIcon from "@/public/icons/team.svg";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/components/context/AuthenticationContext";
import { useDashboard } from "@/components/context/DashboardContext";

const CreateTeamDialog = () => {
  const [teamName, setTeamName] = useState<string>("");
  const { token } = useAuth();
  const { setTeams } = useDashboard();

  const handleSubmit = async () => {
    if (!teamName) {
      return toast.error("team name cannot be empty");
    }

    try {
      const { data } = await axios.post(
        "api/v1/team/create-team",
        { name: teamName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTeams(data.team);
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
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2 cursor-pointer">
            <Image
              alt="profile"
              src={TeamIcon}
              height={40}
              width={40}
              className="h-4 w-4 dark:invert"
            />
            <p className="text-sm font-medium">Create Team</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              What should we call your team ?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Team Name</Label>
              <Input
                id="link"
                placeholder="team name"
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTeamDialog;
