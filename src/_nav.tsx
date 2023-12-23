import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

enum PERMISSION {
  HOME = "HOME",
  PRODUCTS = "PRODUCTS",
  ORDERS = "ORDERS",
  SALES = "SALES",
  USERS = "USERS",
  RECEPTIONS = "RECEPTIONS",
  SYSTEM_USERS = "SYSTEM_USERS",
  PROFILE = "PROFILE",
}

type NavRouter = {
  name: string;
  to?: string;
  icon?: React.Component;
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
  items?: NavRouter[];
};

const NavRoutes = (): (NavRouter | undefined)[] => {
  const context = useContext(AuthContext);

  const permissions =
    context?.user?.role?.permissions?.map((permission) => permission?.name) ||
    [];

  const routes: (NavRouter | undefined)[] = [
    {
      name: "Escritorio",
      to: "/",
    },
    permissions.includes(PERMISSION.SYSTEM_USERS)
      ? {
          name: "Usuarios",
          to: "/usuarios",
        }
      : undefined,

    permissions.includes(PERMISSION.RECEPTIONS)
      ? {
          name: "Recepciones",
          to: "/recepciones",
        }
      : undefined,

    permissions.includes(PERMISSION.PRODUCTS)
      ? {
          name: "Productos",
          to: "/productos",
        }
      : undefined,
    permissions.includes(PERMISSION.USERS)
      ? {
          name: "Clientes",
          to: "/clientes",
        }
      : undefined,
    permissions.includes(PERMISSION.ORDERS)
      ? {
          name: "Pedidos",
          to: "/pedidos",
        }
      : undefined,
    permissions.includes(PERMISSION.SALES)
      ? {
          name: "Ventas",
          to: "/ventas",
        }
      : undefined,

    // {
    //   name: "Ayuda",
    //   to: "/ayuda",
    // },
  ];

  let cleanRoutes = routes.filter((route) => route !== undefined);

  // let cleanSubRoutes = cleanRoutes.map((route) => {
  //   if (route?.items) {
  //     if (route?.items?.length > 0) {
  //       let newRouter = { ...route };
  //       newRouter.items = route?.items.filter((item) => item !== undefined);
  //       return newRouter;
  //     }
  //   } else {
  //     return route;
  //   }
  // });

  return cleanRoutes;
};

export default NavRoutes;
