import React from "react";
import dynamic from "next/dynamic";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

import logo from "@/public/icons/logo-1.svg";
import clickIcon from "@/public/icons/click.svg";
import Image from "next/image";
import WorkspaceLoading from "../WorkspaceLoading";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

interface CanvasProps {
  canvasData?: string;
  setCanvasData: (e: any) => void;
  initialCanvas: string | null;
  isSavingData: boolean;
}

const Canvas: React.FC<CanvasProps> = ({
  setCanvasData,
  initialCanvas,
  isSavingData,
}) => {
  if (initialCanvas === null) {
    return <WorkspaceLoading />;
  }

  if (isSavingData) {
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
