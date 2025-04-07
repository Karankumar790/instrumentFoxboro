import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Login = lazy(() => import("./AuthCycle/Login/login.jsx"))
const SignUp = lazy(() => import("./AuthCycle/SignUp/signUp.jsx"))
const Forget = lazy(() => import("./AuthCycle/Forget/forget.jsx"))
const Product = lazy(() => import("./pages/product.jsx"))
const Content = lazy(() => import("./pages/content.jsx"))
const AdminLayout = lazy(() => import("./AdminDashoard/AdminLayout.jsx"))
const Automation = lazy(() => import("./AdminDashoard/Category/Automation.jsx"))
const CategoryProduct = lazy(() => import("./AdminDashoard/Category/CategoryProduct.jsx"))
const AdminProduct = lazy(() => import("./AdminDashoard/AdminProduct/AdminProduct.jsx"))
const AdminService = lazy(() => import("./AdminDashoard/AdminService.jsx"))
const AdminHeader = lazy(() => import("./AdminDashoard/SiteSetting/AdminHeader.jsx"))
const AdminBanner = lazy(() => import("./AdminDashoard/SiteSetting/AdminBanner.jsx"))
const AdminFooter = lazy(() => import("./AdminDashoard/SiteSetting/AdminFooter.jsx"))
const AdminSoftware = lazy(() => import("./AdminDashoard/AdminSoftware/AdminSoftware.jsx"))
const Estore = lazy(() => import("./pages/estore.jsx"))
const Support = lazy(() => import("./pages/support.jsx"))
const Oneclickproduct = lazy(() => import("./pages/oneclickproduct.jsx"))
const Service = lazy(() => import("./pages/service.jsx"))
const PoGenerator = lazy(() => import("./pages/PoGenerator.jsx"))
const Software = lazy(() => import("./pages/software.jsx"))
const Hardware = lazy(() => import("./pages/Hardware.jsx"))
const TrackService = lazy(() => import("./pages/TrackService.jsx"))

function App() {

  const route = useRoutes([
    { path: '/', element: <Content /> },
    { path: '/product', element: <Product /> },
    { path: '/estore', element: <Estore /> },
    { path: '/support', element: <Support /> },
    { path: '/products/:categoryId', element: <Oneclickproduct /> },
    { path: '/service', element: <Service /> },
    { path: '/poGenerator', element: <PoGenerator /> },
    { path: '/software', element: <Software /> },
    { path: '/hardware', element: <Hardware /> },
    { path: '/login', element: <Login /> },
    { path: '/signUp', element: <SignUp /> },
    { path: '/forget', element: <Forget /> },
    { path: '/trackService', element: <TrackService /> },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "categoryProduct/:categoryId", element: <CategoryProduct /> },
        { path: "automation", element: <Automation /> },
        { path: "adminProduct", element: <AdminProduct /> },
        { path: "adminService", element: <AdminService /> },
        { path: "adminHeader", element: <AdminHeader /> },
        { path: "adminBanner", element: <AdminBanner /> },
        { path: "adminFooter", element: <AdminFooter /> },
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
