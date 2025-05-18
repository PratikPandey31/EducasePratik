
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-3xl w-full mx-auto min-h-screen bg-white px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
