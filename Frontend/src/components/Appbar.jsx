import React from "react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signin from "./Signin";
import Signup from "./Signup";
import { Toaster } from "./ui/toaster";

const Appbar = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("username");

  if (!localStorage.getItem("token")) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="signin">Signin</TabsTrigger>
            <TabsTrigger value="signup">signup</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Signin />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="border-2 border-black w-full h-14 flex justify-between items-center bg-gray-800 text-white">
      <div className="flex gap-7 ml-4">
        <div
          className="hover:bg-gray-500 rounded-md p-1 cursor-pointer "
          onClick={() => navigate("/dashboard")}
        >
          Home
        </div>
        <div
          className="hover:bg-gray-500 rounded-md p-1 cursor-pointer "
          onClick={() => navigate("/employeelist")}
        >
          Employee List
        </div>
        <div
          className="hover:bg-gray-500 rounded-md p-1 cursor-pointer "
          onClick={() => navigate("/createemployee")}
        >
          Create Employee
        </div>
        <div
          className="hover:bg-gray-500 rounded-md p-1 cursor-pointer "
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </div>
      </div>

      <div className="flex gap-4 mr-4">
        <div className="hover:bg-gray-500 rounded-md p-1 ">{name}</div>
        <div
          className="hover:bg-gray-500 rounded-md p-1 cursor-pointer "
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Appbar;
