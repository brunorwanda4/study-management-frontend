import type React from "react";

interface props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: props) => {
  return <div className=" px-4 py-4">{children}</div>;
};

export default AdminLayout;
