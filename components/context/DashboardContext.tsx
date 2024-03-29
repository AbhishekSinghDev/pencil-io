"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthenticationContext";
import axios, { AxiosError } from "axios";
import { TeamInterface } from "@/db/models/team.model";
import Loading from "../shared/Loading";
import ErrorPage from "../shared/Error";

interface DashboardContextInterface {
  teams: Array<TeamInterface> | undefined;
  setTeams: (e: any) => void;
  selectedTeam: TeamInterface | undefined;
  setSelectedTeam: (e: any) => void;
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
  const [teams, setTeams] = useState<Array<TeamInterface> | undefined>(
    undefined
  );
  const [selectedTeam, setSelectedTeam] = useState<TeamInterface | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("api/v1/team/all-teams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.teams) {
          setTeams(data.teams);
          setSelectedTeam(data.teams[0]);
        }
      } catch (err) {
        const error = err as AxiosError;
        const data: any = error.response?.data;
        if (data?.message) {
          alert(data.message);
          return;
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchTeams();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <DashboardContext.Provider
      value={{ teams, setTeams, selectedTeam, setSelectedTeam }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): {
  teams: Array<TeamInterface> | undefined;
  setTeams: (e: any) => void;
  selectedTeam: TeamInterface | undefined;
  setSelectedTeam: (e: any) => void;
} => {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error("useDashboard is defined outside of the provider");
  }

  return dashboardContext;
};
