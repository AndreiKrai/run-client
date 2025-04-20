import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
// Layouts
import MainLayout from "./layouts/MainLayout";

// Public pages
// import Home from "../pages/public/Home";

// These pages will be lazy-loaded
// const Dashboard = React.lazy(() => import("../pages/private/Dashboard"));
// const Profile = React.lazy(() => import("../pages/private/Profile"));

// Private route wrapper component
interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Define routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        // element: <Home />,
      },
    ],
  },
//   {
//     path: "/",
//     element: <AuthLayout />,
//     children: [
//       {
//         path: "dashboard",
//         element: (
//           <React.Suspense fallback={<div>Loading...</div>}>
//             <PrivateRoute element={<Dashboard />} />
//           </React.Suspense>
//         ),
//       },
//       {
//         path: "profile",
//         element: (
//           <React.Suspense fallback={<div>Loading...</div>}>
//             <PrivateRoute element={<Profile />} />
//           </React.Suspense>
//         ),
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <Navigate to="/" replace />,
//   },
];

export default routes;
