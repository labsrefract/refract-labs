import { createBrowserRouter } from "react-router";
import { createElement } from "react";
import Root from "./components/Root";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import Process from "./pages/Process";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const pages = [
  { index: true, Component: Home },
  { path: "services", Component: Services },
  { path: "work", Component: Work },
  { path: "work/:slug", Component: WorkDetail },
  { path: "process", Component: Process },
  { path: "about", Component: About },
  { path: "contact", Component: Contact },
  { path: "*", Component: NotFound },
];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        errorElement: createElement(NotFound),
        children: pages,
      },
    ],
  },
]);
