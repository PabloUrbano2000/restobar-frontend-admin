import { useState } from "react";
import Header from "../ui/Header";
import AppSidebar from "../ui/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex w-full h-screen relative">
      <AppSidebar
        show={showSidebar}
        onShow={() => setShowSidebar(!showSidebar)}
      />
      <div
        className={`w-5/6 ml-auto md:w-4/5 d-flex flex-column min-vh-100 overflow-auto`}
      >
        <Header />
        <div className="flex-grow-1 py-4 md:px-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
