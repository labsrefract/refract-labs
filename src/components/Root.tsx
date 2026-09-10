import { useLocation } from "react-router";
import { useEffect } from "react";
import { ThemeProvider } from "../context/theme";
import Nav from "./Nav";
import Footer from "./Footer";
import PageFade from "./PageFade";

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const move = () =>
        document.getElementById(id)?.scrollIntoView({
          block: "start",
          behavior: reduced ? "auto" : "smooth",
        });
      requestAnimationFrame(move);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Root() {
  return (
    <ThemeProvider>
      <ScrollReset />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="page-shell">
        <Nav />
        <main id="main">
          <PageFade />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
