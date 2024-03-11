"use client";

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboard } from "@/components/context/DashboardContext";
import { useRouter } from "next/navigation";
import CircularLoading from "../CircularLoading";

const FileTable = () => {
  const [redirectLoading, setRedirectLoading] = useState<boolean>(false);
  const router = useRouter();
  const { selectedTeam } = useDashboard();
  const projects = selectedTeam?.projects;

  return (
    <div className="w-full px-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Edited On</TableHead>
            <TableHead className="text-right">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.length !== 0 && projects ? (
            projects.map((project) => (
              <TableRow
                key={project._id}
                onClick={() => {
                  router.push(`/workspace/${project._id}`);
                  setRedirectLoading(true);
                }}
                className="cursor-pointer"
              >
                <TableCell className="font-medium line-clamp-1">
                  {project.name}
                </TableCell>
                <TableCell>
                  {new Date(project.createdAt).toDateString()}
                </TableCell>
                <TableCell>
                  {new Date(project.updatedAt).toDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {project.createdBy}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>

      {redirectLoading && (
        <div className="flex items-center justify-center gap-4 my-4">
          <CircularLoading />
          <p className="font-bold text-xl animate-pulse">
            Initializing Workspace
          </p>
        </div>
      )}

      {projects?.length === 0 && (
        <p className="w-full text-center my-10 font-medium">
          Your list is empty
        </p>
      )}
    </div>
  );
};

export default FileTable;
