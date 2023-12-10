import React from "react";
import { NavLink } from "react-router-dom";
import NavRoutes from "../../_nav";

const Sidebar = () => {
  const routes = NavRoutes();

  return (
    <div
      className="md:w-2/5 xl:w-1/5 bg-gray-800 h-full"
      style={{ minHeight: "100vh" }}
    >
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          RestobarAdmin
        </p>
        <p className="mt-3 text-gray-500">
          Administra tu restobar en las siguientes opciones:
        </p>
        <nav className="mt-10">
          {routes.map((router) => (
            <NavLink
              key={router?.name}
              className={({ isActive }) => {
                return `p-1 py-2 block hover:bg-yellow-500 hover:text-gray-500 ${
                  isActive ? "text-yellow-500" : "text-gray-400"
                }`;
              }}
              to={router?.to || ""}
            >
              {router?.name || ""}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
