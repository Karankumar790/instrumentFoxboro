import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Login = lazy(() => import("./AuthCycle/Login/login.jsx"))
const SignUp = lazy(() => import("./AuthCycle/SignUp/signUp.jsx"))
const Forget = lazy(() => import("./AuthCycle/Forget/forget.jsx"))
const Product = lazy(() => import("./pages/product.jsx"))
const Content = lazy(() => import("./pages/content.jsx"))
const AdminLayout = lazy(() => import("./AdminDashoard/AdminLayout.jsx"))
const Automation = lazy(() => import("./AdminDashoard/Category/Automation.jsx"))
const AdminProduct = lazy(() => import("./AdminDashoard/AdminProduct.jsx"))
const AdminService = lazy(() => import("./AdminDashoard/AdminService.jsx"))
const SiteSetting = lazy(() => import("./AdminDashoard/SiteSetting.jsx"))
const AdminSoftware = lazy(() => import("./AdminDashoard/AdminSoftware.jsx"))
const Estore = lazy(() => import("./pages/estore.jsx"))
const Support = lazy(() => import("./pages/support.jsx"))
const Oneclickproduct = lazy(() => import("./pages/oneclickproduct.jsx"))
const Service = lazy(() => import("./pages/service.jsx"))
const Software = lazy(() => import("./pages/software.jsx"))
const Hardware = lazy(() => import("./pages/Hardware.jsx"))

function App() {

  const route = useRoutes([
    { path: '/', element: <Content /> },
    { path: '/product', element: <Product /> },
    { path: '/estore', element: <Estore /> },
    { path: '/support', element: <Support /> },
    { path: '/products', element: <Oneclickproduct /> },
    { path: '/service', element: <Service /> },
    { path: '/software', element: <Software /> },
    { path: '/hardware', element: <Hardware /> },
    { path: '/login', element: <Login /> },
    { path: '/signUp', element: <SignUp /> },
    { path: '/forget', element: <Forget /> },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "automation", element: <Automation /> },
        { path: "adminProduct", element: <AdminProduct /> },
        { path: "adminService", element: <AdminService /> },
        { path: "siteSetting", element: <SiteSetting /> },
        { path: "adminSoftware", element: <AdminSoftware /> },

      ]
    }

  ])

  return (
    <>
      <Suspense fallback={<div>Loadings...</div>}>

        {route}

      </Suspense>
    </>
  );
}

export default App;
