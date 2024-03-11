"use client";

import { useAuth } from "@/components/context/AuthenticationContext";
import { useDashboard } from "@/components/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import axiosInstance from "@/lib/axios_instance";
import CircularLoading from "../CircularLoading";

const SideNavigation = () => {
  const [redirectLoading, setRedirectLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | undefined>();
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
  const [totalFileLimit, setTotalFileLimit] = useState<number>(0);
  const [fileLimitValue, setFileLimitValue] = useState<number>(0);
  const router = useRouter();
  const { selectedTeam } = useDashboard();
  const { token } = useAuth();
  const team_id = selectedTeam?._id;

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const { data } = await axiosInstance.post(
          "api/v1/team/team-details",
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
          const totalFiles = data?.team.projects.length;
          const fileLimit = data?.team.limit;
          setTotalFileLimit(fileLimit);
          setFileLimitValue(totalFiles);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (team_id) fetchTeamDetails();
  }, [team_id, token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.post(
          "api/v1/auth/who",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setIsPremiumUser(data.user.isPremiumUser);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleNewFile = async () => {
    if (fileName === undefined) {
      toast.error("file name cannot be empty!");
      return;
    }

    try {
      const { data } = await axios.post(
        "api/v1/project/create-project",
        {
          team_id: team_id,
          project_name: fileName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(data.message);
        const projectID = data?.project._id;
        setFileLimitValue(data.length);
        router.push(`/workspace/${projectID}`);
        setRedirectLoading(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      const data: any = error.response?.data;
      if (data?.message) {
        toast.error(data.message);
        setTimeout(() => {
          router.push("/pricing");
        }, 1000);
        return;
      }
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full space-y-4">
        {redirectLoading && (
          <div className="flex items-center justify-start gap-3">
            <CircularLoading />
            <p className="font-bold text-lg animate-pulse">
              Initializing Workspace
            </p>
          </div>
        )}

        <Button className="w-full" asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">New File</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create new file</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    placeholder="file name"
                    onChange={(e) => setFileName(e.target.value)}
                    value={fileName}
                    autoComplete="off"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <div className="flex gap-2 items-center justify-center">
                    <Button type="button" onClick={handleNewFile}>
                      Create
                    </Button>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Button>
        <div className="space-y-2">
          {!isPremiumUser ? (
            <>
              <Progress value={fileLimitValue * 20} />
              <p className="text-sm">
                <span className="font-bold">{fileLimitValue}</span> out of{" "}
                <span className="font-bold">{totalFileLimit}</span> files used.
              </p>
            </>
          ) : (
            <>
              <Progress value={fileLimitValue} />
              <p className="text-sm">
                <span className="font-bold">{fileLimitValue}</span> out of{" "}
                <span className="font-bold">{totalFileLimit}</span> files used.
              </p>
            </>
          )}
          {!isPremiumUser ? (
            <p className="text-sm">
              <Link href="/pricing" className="underline underline-offset-4">
                Upgrade
              </Link>{" "}
              your plan for unlimited access.
            </p>
          ) : (
            <p>Current plan: Professional</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNavigation;
