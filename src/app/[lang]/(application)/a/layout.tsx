import React from "react";

interface props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return <div className="px-2 py-4 lg:px-4 lg:py-8">{children}</div>;
};

export default AdminLayout;
