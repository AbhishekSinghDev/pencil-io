"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboard } from "@/components/context/DashboardContext";

const FileTable = () => {
  const { selectedTeam } = useDashboard();
  const projects = selectedTeam?.projects;

  return (
    <div className="w-full px-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Edited On</TableHead>
            <TableHead className="text-right">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.length !== 0 && projects ? (
            projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-medium">{project.name}</TableCell>
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

      {projects?.length === 0 && (
        <p className="w-full text-center my-10 font-medium">
          Your list is empty
        </p>
      )}
    </div>
  );
};

export default FileTable;
