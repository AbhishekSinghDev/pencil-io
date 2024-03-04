"use client";

import { useAuth } from "@/components/context/AuthenticationContext";
import Sidebar from "@/components/shared/dashboard_components/Sidebar";
import { UserInterface } from "@/db/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/shared/dashboard_components/DashboardNavbar";
import FileTable from "@/components/shared/dashboard_components/FileTable";
import Loading from "@/components/shared/Loading";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "api/v1/auth/who",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setUser(data.user);
          return;
        }

        toast.error(data.message);
        setIsError(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchUser();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    router.push("/login");
    return <p>Something went wrong</p>;
  }

  return (
    <section className="h-full w-full">
      <div className="flex h-screen w-full">
        <div className="border w-[17vw] hidden lg:block">
          <Sidebar user={user} />
        </div>
        <div className="lg:w-[83vw] w-full">
          <div className="w-full">
            <DashboardNavbar />
          </div>
          <div className="w-full">
            <FileTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
