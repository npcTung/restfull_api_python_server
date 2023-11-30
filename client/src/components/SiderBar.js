import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { siderBar } from "ultils/constant";

const SiderBar = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 pt-20 border-r">
      {siderBar.map((el) => (
        <div
          key={el.id}
          className="w-full border-b border-gray-300 border-dashed px-5 pb-1"
        >
          <NavLink
            to={el.path}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-orange-500 underline"
                  : "hover:text-orange-500 hover:underline transition-all"
              }`
            }
          >
            {el.value}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default memo(SiderBar);
