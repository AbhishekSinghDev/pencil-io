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
    <section className="mx-auto h-screen">
      <div className="w-full h-auto flex items-center justify-between py-2 border-b px-6">
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
          <p className="text-lg font-bold">Pencil.io</p>
        </Link>
        <div>
          <ul className="items-center justify-center hidden md:flex border rounded">
            <li
              className={`hover:bg-slate-200 lg:text-xs text-sm font-semibold p-1 px-2 border-r cursor-pointer ${
                selectDocument && "bg-slate-200"
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
              className={`hover:bg-slate-200 lg:text-xs text-sm font-semibold p-1 px-2 border-r cursor-pointer ${
                selectBoth && "bg-slate-200"
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
              className={`hover:bg-slate-200 lg:text-xs text-sm font-semibold p-1 px-2 cursor-pointer ${
                selectCanvas && "bg-slate-200"
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
          {isSavingData ? (
            <WorkspaceLoading />
          ) : (
            <p className="font-medium">Save status</p>
          )}
          <div
            onClick={saveEditor}
            className="bg-blue-600 rounded-sm text-white flex items-center justify-center place-items-center p-1 px-3 gap-1 cursor-pointer"
          >
            <p className="text-sm font-bold">Save</p>
            <Image
              src={saveIcon}
              alt="save"
              height={35}
              width={35}
              className="h-5 w-5 invert"
            />
          </div>
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
