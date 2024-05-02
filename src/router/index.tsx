import { createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";
import Login from "../views/login";
import { MainLayout } from "../layout";
import Onboarding from "../views/onboarding";
import Register from "../views/register";
import Chat from "../views/chat";

// import { MainLayout } from "@/layout";
// import Login from "@/views/login";

const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Onboarding />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

export default router;
