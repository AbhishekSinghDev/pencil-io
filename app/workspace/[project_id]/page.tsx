"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Canvas from "@/components/shared/workspace_components/Canvas";

import axiosInstance from "@/lib/axios_instance";

import logo from "@/public/icons/logo-1.svg";
import saveIcon from "@/public/icons/save.svg";
import Image from "next/image";
import WorkspaceLoading from "@/components/shared/WorkspaceLoading";
import Link from "next/link";
import Loading from "@/components/shared/Loading";
import Editor from "@/components/shared/workspace_components/Editor";
import { Button } from "@/components/ui/button";

const ProjectWorkspace = ({ params }: { params: { project_id: string } }) => {
  const project_id = params.project_id;

  const [canvasData, setCanvasData] = useState<any>();
  const [initialCanvas, setInitialCanvas] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSavingData, setIsSavingData] = useState<boolean>(false);

  const [selectDocument, setSelectDocument] = useState<boolean>(false);
  const [selectBoth, setSelectBoth] = useState<boolean>(true);
  const [selectCanvas, setSelectCanvas] = useState<boolean>(false);

  // fetch initial values for canvas and editor
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.post(
          "api/v1/project/project-details",
          { projectID: project_id }
        );

        if (data.success) {
          setInitialCanvas(data.canvasData);
          setEditorData(data.editorData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [project_id]);

  // save canvas and editor
  const saveEditor = async () => {
    try {
      setIsSavingData(true);
      const { data } = await axiosInstance.post("api/v1/project/save-project", {
        projectID: project_id,
        canvasData: JSON.stringify(canvasData),
        editorData: editorData,
      });

      if (data.success) {
        console.log("canvas saved");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSavingData(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mx-auto absolute inset-0 h-fit w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="w-full h-auto flex items-center justify-between py-2 border-b px-6 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <Image
            src={logo}
            alt="logo"
            height={100}
            width={100}
            className="h-6 w-6"
          />
          <p className="text-base font-bold">Pencil.io</p>
        </Link>
        <div>
          <ul className="items-center justify-center hidden md:flex border rounded-md">
            <li
              className={`hover:bg-gray-600 bg-opacity-30 text-sm font-semibold p-2 px-3 border-r cursor-pointer ${
                selectDocument && "bg-gray-600"
              }`}
              onClick={() => {
                setSelectDocument(true);
                setSelectBoth(false);
                setSelectCanvas(false);
              }}
            >
              Document
            </li>
            <li
              className={`hover:bg-gray-600 bg-opacity-30 text-sm font-semibold p-2 px-3 border-r cursor-pointer ${
                selectBoth && "bg-gray-600"
              }`}
              onClick={() => {
                setSelectBoth(true);
                setSelectDocument(false);
                setSelectCanvas(false);
              }}
            >
              Both
            </li>
            <li
              className={`hover:bg-gray-600 bg-opacity-30 text-sm font-semibold p-2 px-3 cursor-pointer ${
                selectCanvas && "bg-gray-600"
              }`}
              onClick={() => {
                setSelectDocument(false);
                setSelectBoth(false);
                setSelectCanvas(true);
              }}
            >
              Canvas
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ul className="flex items-center justify-center gap-2">
            <Button size="sm" className="text-xs font-medium" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button size="sm" className="text-xs font-medium">
              Export Doc
            </Button>
          </ul>

          {isSavingData ? (
            <WorkspaceLoading />
          ) : (
            <p className="font-medium">Save status</p>
          )}
          <Button size="sm" asChild>
            <div
              onClick={saveEditor}
              className="flex items-center justify-center place-items-center gap-1 cursor-pointer"
            >
              <p className="font-bold">Save</p>
              <Image
                src={saveIcon}
                alt="save"
                height={35}
                width={35}
                className="h-5 w-5"
              />
            </div>
          </Button>
        </div>
      </div>

      <div className="max-w-screen-3xl mx-auto h-[95vh]">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg w-full h-full"
        >
          <ResizablePanel
            defaultSize={35}
            className={`${selectCanvas && "hidden"}`}
          >
            <div className="flex h-full w-full items-center justify-center p-6">
              {isSavingData ? (
                <WorkspaceLoading />
              ) : (
                <Editor editorData={editorData} setEditorData={setEditorData} />
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={65}
            className={`${selectDocument && "hidden"}`}
          >
            <div className="flex h-full items-center justify-center p-6">
              <Canvas
                setCanvasData={setCanvasData}
                initialCanvas={initialCanvas}
                isSavingData={isSavingData}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
};

export default ProjectWorkspace;
