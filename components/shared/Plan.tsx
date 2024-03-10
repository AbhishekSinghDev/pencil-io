"use client";

import axiosInstance from "@/lib/axios_instance";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthenticationContext";

const Plan = () => {
  const { token } = useAuth();
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
  const [plans, setPlans] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.post(
          "api/v1/auth/who",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(data);
        if (data.success) {
          setIsPremiumUser(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchUser();
  }, [token]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data } = await axiosInstance.get("api/v1/get-plans");

        if (data.success) {
          setPlans(data.plans[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlan();
  }, []);

  const handleSubscription = async () => {
    try {
      const { data } = await axiosInstance.post(
        "api/v1/payments",
        {
          priceId: plans.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        window.location.assign(data.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const manageSubscription = async () => {};

  return (
    <div className="bg-white/5 ring-2 ring-yellow-400 rounded-3xl p-8 xl:p-10">
      <div className="flex items-baseline justify-between gap-x-4">
        <h2
          id="product2"
          className="text-lg font-semibold leading-8 text-white"
        >
          Professional
        </h2>
        <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
          Most popular
        </p>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-300">
        BILLED ANNUALLY or ₹ 50 MONTHLY
      </p>
      <p className="mt-8 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-white">
          {plans?.unit_amount &&
            (plans.unit_amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
        </span>
        <span className="text-sm font-semibold leading-6 text-gray-300"></span>
      </p>
      {isPremiumUser ? (
        <>
          <a
            onClick={manageSubscription}
            aria-describedby="product2"
            className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer"
          >
            Manage Subscription
          </a>
        </>
      ) : (
        <a
          onClick={handleSubscription}
          aria-describedby="product2"
          className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer"
        >
          Subscribe
        </a>
      )}
      <ul
        role="list"
        className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
      >
        <li className="flex gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-5 flex-none text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          unlimited files
        </li>
        <li className="flex gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-5 flex-none text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          90-day version history
        </li>
        <li className="flex gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-5 flex-none text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          unlimited guests
        </li>

        <li className="flex gap-x-3 text-yellow-300 rounded-md p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-5 flex-none text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          PDF Exports
        </li>
        <li className="flex gap-x-3 text-yellow-300 rounded-md p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-5 flex-none text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Private files
        </li>
        <li className="flex gap-x-3 text-yellow-300 rounded-md p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-5 flex-none text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            ></path>
          </svg>
          + Everyting in Free
        </li>
      </ul>
    </div>
  );
};

export default Plan;
