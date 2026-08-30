import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { ThemeProvider } from "../context/theme";
import Nav from "./Nav";
import Footer from "./Footer";

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function Root() {
  return (
    <ThemeProvider>
      <ScrollReset />
      <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
