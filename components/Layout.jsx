import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main className="max-w-xl m-auto">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
