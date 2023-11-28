import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        background: "darkblue",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
