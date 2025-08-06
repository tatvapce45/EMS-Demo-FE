import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import OTPWrapper from "../components/features/Authentication/OTPWrapper";
import EmployeeRegistration from "../components/features/Authentication/Registration";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <OTPWrapper/>
    },
    {
      path: "/register",
      element: <EmployeeRegistration/>
    }
  ]);
  return routes;
};

export default AppRoutes;