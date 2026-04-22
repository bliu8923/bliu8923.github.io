import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "contact", Component: Contact },
      { path: "resume", Component: Resume },
    ],
  },
]);
