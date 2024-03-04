"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

import logo from "@/public/icons/logo-1.svg";
import clickIcon from "@/public/icons/click.svg";
import Image from "next/image";
import axiosInstance from "@/lib/axios_instance";
import WorkspaceLoading from "../WorkspaceLoading";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

interface CanvasProps {
  project_id: string;
  canvasData?: string;
  setCanvasData: (e: any) => void;
}

const Canvas: React.FC<CanvasProps> = ({ project_id, setCanvasData }) => {
  const [initialCanvas, setInitialCanvas] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCanvasData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.post(
          "api/v1/project/project-details",
          { canvasID: project_id }
        );

        if (data.success) {
          setInitialCanvas(data.canvasData);
          console.log(data.canvasData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCanvasData();
  }, [project_id, setInitialCanvas]);

  if (isLoading) {
    return <WorkspaceLoading />;
  }

  return (
    <Excalidraw
      onChange={(excalidrawElements) => setCanvasData(excalidrawElements)}
      initialData={{
        elements: initialCanvas ? JSON.parse(initialCanvas) : null,
      }}
    >
      <WelcomeScreen>
        <WelcomeScreen.Hints.MenuHint />
        <WelcomeScreen.Hints.ToolbarHint />
        <WelcomeScreen.Center>
          <WelcomeScreen.Center.Logo>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-6">
                <Image
                  src={logo}
                  alt="logo"
                  height={100}
                  width={100}
                  className="h-20 w-20"
                />

                <p className="text-7xl font-bold text-blue-500">Pencil.io</p>
              </div>
              <p className="text-lg">by Abhishek Singh</p>
            </div>
          </WelcomeScreen.Center.Logo>
          <WelcomeScreen.Center.Heading>
            Diagrams made simple
          </WelcomeScreen.Center.Heading>
          <WelcomeScreen.Center.Menu>
            <WelcomeScreen.Center.MenuItemLink href="https://abhishek-singh-dev.vercel.app/">
              <div className="font-bold flex items-center justify-center gap-2">
                <p className="text-black">Abhishek Singh Portfolio</p>
                <Image
                  src={clickIcon}
                  alt="click"
                  height={50}
                  width={50}
                  className="h-6 w-6"
                />
              </div>
            </WelcomeScreen.Center.MenuItemLink>
            <WelcomeScreen.Center.MenuItemHelp />
          </WelcomeScreen.Center.Menu>
        </WelcomeScreen.Center>
        <WelcomeScreen.Hints.HelpHint />
      </WelcomeScreen>
      <MainMenu>
        <MainMenu.DefaultItems.LoadScene />
        <MainMenu.DefaultItems.Export />
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.ClearCanvas />
        <MainMenu.DefaultItems.Help />
        <MainMenu.DefaultItems.ToggleTheme />
        <MainMenu.DefaultItems.ChangeCanvasBackground />
      </MainMenu>
    </Excalidraw>
  );
};

export default Canvas;
