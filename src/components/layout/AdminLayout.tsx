// import AppContent from "../ui/Content";
import Header from "../ui/Header";
import AppSidebar from "../ui/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <AppSidebar />
      <div className="md:w-3/5 xl:w-4/5 d-flex flex-column min-vh-100 overflow-auto">
        <Header />
        <div className="flex-grow-1 p-4">
          {/* <AppContent /> */}
          {children}
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default AdminLayout;
