"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@/components/shared/workspace_components/Editor";
import Canvas from "@/components/shared/workspace_components/Canvas";

import axiosInstance from "@/lib/axios_instance";
import { Button } from "@/components/ui/button";
import logo from "@/public/icons/logo-1.svg";
import Image from "next/image";
import WorkspaceLoading from "@/components/shared/WorkspaceLoading";
import Link from "next/link";

const ProjectWorkspace = ({ params }: { params: { project_id: string } }) => {
  const project_id = params.project_id;

  const [canvasData, setCanvasData] = useState<any>();
  const [saveButton, setSaveButton] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateCanvas = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.post(
          "api/v1/project/save-project",
          {
            canvasID: project_id,
            canvasData: JSON.stringify(canvasData),
          }
        );

        if (data.success) {
          console.log("canvas saved");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (project_id) updateCanvas();
  }, [saveButton]);

  return (
    <section className="mx-auto px-6 h-screen">
      <div className="w-full h-auto flex items-center justify-between my-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <Image
            src={logo}
            alt="logo"
            height={100}
            width={100}
            className="h-8 w-8"
          />
          <p className="text-xl font-bold">Pencil.io</p>
        </Link>
        <div>
          <ul className="items-center justify-center gap-1 hidden md:flex">
            <li>
              <Button variant="link" size="sm" asChild>
                <Link
                  href="/"
                  className="lg:text-base text-sm border rounded-md font-bold"
                >
                  Home
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" size="sm" asChild>
                <Link
                  href="/dashboard"
                  className="lg:text-base text-sm border rounded-md font-bold"
                >
                  Dashboard
                </Link>
              </Button>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-4">
          {isLoading && <WorkspaceLoading />}
          <Button onClick={() => setSaveButton(!saveButton)}>Save</Button>
        </div>
      </div>

      <div className="max-w-screen-3xl mx-auto h-[90vh]">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg w-full h-full"
        >
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-6">
              <Editor />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <Canvas project_id={project_id} setCanvasData={setCanvasData} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
};

export default ProjectWorkspace;
