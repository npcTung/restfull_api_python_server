import React from "react";
import { Outlet } from "react-router-dom";
import { SiderBar } from "components";

const Home = () => {
  return (
    <div className="w-full flex gap-5">
      <div className="fixed w-[17%] h-screen">
        <SiderBar />
      </div>
      <div className="w-[17%] h-full"></div>
      <main id="main" className="w-[83%]">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
