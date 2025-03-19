import React from "react";
import Header from "@/container/Header";
import Footer from "@/container/Footer";
import { Outlet } from "react-router-dom";
interface Props {
  children?: React.ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <div className="">
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
}
