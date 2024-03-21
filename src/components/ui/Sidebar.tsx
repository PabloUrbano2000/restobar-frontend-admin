import React from "react";
import { NavLink } from "react-router-dom";
import NavRoutes from "../../_nav";
import { useAuthContext } from "../../context/AuthContext";

interface SidebarProps {
  show: boolean;
  onShow: () => void;
}
const Sidebar = ({ show, onShow }: SidebarProps) => {
  const routes = NavRoutes();
  const { user } = useAuthContext();

  const getColor = (rol: string | undefined) => {
    let color = ''
    switch (rol) {
      case 'WAITER':
        color = '#65E079';
        break;
      case 'ADMIN':
        color = '#1C8DD9';
        break;
      case 'GLOBAL_ADMIN':
        color = '#E02D12';
        break;
      case 'CHEF':
        color = '#E100C2';
        break;
      default:
        color = '#B7BDD6';
    }
    return color;
  }

  return (
    <div
      className={`${show ? "w-3/4 absolute" : "w-1/6"
        } sm:relative md:w-2/5 xl:w-1/5  h-screen z-50`} style={{ backgroundColor: getColor(user?.role?.name) }}
    >
      <div className="flex flex-col p-3">
        <button
          onClick={() => onShow()}
          className="ml-auto p-4 w-5 h-5 rounded md:hidden block flex-col items-center justify-center"
        >
          {show ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      <div className={`p-6 ${show ? "block" : "hidden"} md:block`}>
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
                return `p-1 py-2 block hover:bg-yellow-500 hover:text-gray-500 ${isActive ? "text-yellow-500" : "text-gray-400"
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
