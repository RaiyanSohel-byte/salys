"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Add any route(s) where you want to hide Navbar/Footer
  const shouldHideLayout =
    pathname.startsWith("/chat") ||
    pathname === "/login" ||
    pathname === "/signup";

  // const shouldHideLayout = hiddenRoutes.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
