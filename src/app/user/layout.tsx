import Footer from "@/layout/footer/footer";
import Header from "@/layout/header/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-400 h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
