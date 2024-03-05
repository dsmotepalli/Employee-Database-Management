import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen justify-center items-center text-5xl font-extrabold">
      Welcome {localStorage.getItem("username")}
    </div>
  );
};

export default Dashboard;
