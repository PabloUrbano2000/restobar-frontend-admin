import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import LoginPage from "../components/pages/auth/Login";
import {
  authStatus,
  useAuthContext,
  AuthProvider,
} from "../context/AuthContext";

import { LAST_PATH } from "../utils/constants";
import AuthLayout from "../components/layout/AuthLayout";
import ErrorPage404 from "../components/pages/auth/404";
import HomePage from "../components/pages/Home";
import ProductsPage from "../components/pages/products/Products";
import HelpPage from "../components/pages/Help";
import NewProductPage from "../components/pages/products/NewProduct";
import EditProductPage from "../components/pages/products/EditProduct";
import UsersPage from "../components/pages/users/Users";
import NewUserPage from "../components/pages/users/NewUser";
import EditUserPage from "../components/pages/users/EditUser";
import OrdersPage from "../components/pages/orders/Orders";
import NewOrderPage from "../components/pages/orders/NewOrder";
import EditOrderPage from "../components/pages/orders/EditOrder";
import ReceptionsPage from "../components/pages/receptions/Receptions";
import NewReceptionPage from "../components/pages/receptions/NewReception";
import EditReceptionPage from "../components/pages/receptions/EditReception";

import firebase, { FirebaseContext } from "../firebase";

interface RequireAuthProps {
  isAllowed: boolean;
  children?: React.ReactNode;
  redirectTo?: string;
}

function RequireAuth({
  isAllowed,
  children,
  redirectTo = "/auth/login",
}: RequireAuthProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return <AdminLayout>{children ? children : <Outlet />}</AdminLayout>;
}

const AppRouter = () => {
  const context = useAuthContext();

  const { status, user } = context || {};

  const navigate = useNavigate();
  React.useEffect(() => {
    if (status === authStatus.Ready) {
      if (!user) {
        if (!location.href.includes("/auth/")) {
          navigate("/auth/login", { replace: true });
        }
      } else {
        const PATH = sessionStorage.getItem(LAST_PATH) || "/";
        navigate(PATH, { replace: true });
      }
    }
  }, [status]);

  return (
    <Routes>
      <Route element={<RequireAuth isAllowed={!!user} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ayuda" element={<HelpPage />} />
      </Route>

      <Route element={<FirebaseContainer />}>
        <Route
          element={
            <RequireAuth
              isAllowed={
                !!user &&
                !!user.role?.permissions?.some(
                  (per) => per.name === "RECEPTIONS"
                )
              }
            />
          }
        >
          <Route path="/recepciones" element={<ReceptionsPage />} />
          <Route path="/recepciones/nuevo" element={<NewReceptionPage />} />
          <Route
            path="/recepciones/editar/:id"
            element={<EditReceptionPage />}
          />
        </Route>

        <Route
          element={
            <RequireAuth
              isAllowed={
                !!user &&
                !!user.role?.permissions?.some((per) => per.name === "PRODUCTS")
              }
            />
          }
        >
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/nuevo" element={<NewProductPage />} />
          <Route path="/productos/editar/:id" element={<EditProductPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              isAllowed={
                !!user &&
                !!user.role?.permissions?.some(
                  (per) => per.name === "SYSTEM_USERS"
                )
              }
            />
          }
        >
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/usuarios/nuevo" element={<NewUserPage />} />
          <Route path="/usuarios/editar/:id" element={<EditUserPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              isAllowed={
                !!user &&
                !!user.role?.permissions?.some((per) => per.name === "ORDERS")
              }
            />
          }
        >
          <Route path="/ordenes" element={<OrdersPage />} />
          <Route path="/ordenes/nuevo" element={<NewOrderPage />} />
          <Route path="/ordenes/editar/:id" element={<EditOrderPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/404" element={<ErrorPage404 />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth/404" replace />} />
    </Routes>
  );
};

export const AppRouterComponentContainer = () => (
  <Router>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </Router>
);

const FirebaseContainer = ({ children }: { children?: React.ReactNode }) => (
  <FirebaseContext.Provider value={{ firebase }}>
    {children ? children : <Outlet />}
  </FirebaseContext.Provider>
);
