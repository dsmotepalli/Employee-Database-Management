import React, { useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { url } from "../url";
import { useNavigate } from "react-router-dom";
import { toast, useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${url}` + `/user/signin`, {
        username: username,
        password: password,
      });
      if (data.token) {
        localStorage.setItem("username", data.name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        navigate("/dashboard");
      }

      if (!data.token) {
        toast({ title: data.message, variant: "destructive" });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    }
  };

  return (
    <div className="block w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
      <div>
        <div className="px-10">
          <div className="text-3xl font-extrabold">Sign in</div>
        </div>
        <div className="pt-2 flex flex-col gap-3">
          <Input
            label="Username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type={"password"}
            placeholder="password must be greater than 8 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
