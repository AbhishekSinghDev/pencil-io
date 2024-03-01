"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DashboardContextInterface {
  team: string | undefined;
  setTeam: (e: string) => void;
}

interface DashboardContextProviderInterface {
  children: React.ReactNode;
}

const DashboardContext = createContext<DashboardContextInterface | undefined>(
  undefined
);

export const DashboardContextProvider: React.FC<
  DashboardContextProviderInterface
> = ({ children }) => {
  const [team, setTeam] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTeam(team);
  }, [team]);

  return (
    <DashboardContext.Provider value={{ team, setTeam }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): {
  team: string | undefined;
  setTeam: (e: string) => void;
} => {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error("useDashboard is defined outside of the provider");
  }

  return dashboardContext;
};
