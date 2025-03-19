import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import path from "@/constants/path";
import { lazy, Suspense, useContext } from "react";
import { AppContext } from "@/core/context/AppContext";
const SignIn = lazy(() => import("@/features/Auth/SignIn"));
const SignUp = lazy(() => import("@/features/Auth/SignUp"));

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: path.signIn,
              element: (
                <Suspense>
                  <SignIn />
                </Suspense>
              ),
            },
            {
              path: path.signUp,
              element: (
                <Suspense>
                  <SignUp />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return routeElement;
}
