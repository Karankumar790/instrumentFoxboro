import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = lazy(() => import("./AuthCycle/Login/login.jsx"))
const SignUp = lazy(() => import("./AuthCycle/SignUp/signUp.jsx"))
const Forget = lazy(() => import("./AuthCycle/Forget/forget.jsx"))
const Product = lazy(() => import("./pages/product.jsx"))
const Content = lazy(() => import("./pages/content.jsx"))
const AdminLayout = lazy(() => import("./AdminDashoard/AdminLayout.jsx"))
const Automation = lazy(() => import("./AdminDashoard/Category/Automation.jsx"))
const CategoryProduct = lazy(() => import("./AdminDashoard/Category/CategoryProduct.jsx"))
const AdminProduct = lazy(() => import("./AdminDashoard/AdminProduct/AdminProduct.jsx"))
const AdminService = lazy(() => import("./AdminDashoard/AdminService/AdminService.jsx"))
const AdminHeader = lazy(() => import("./AdminDashoard/SiteSetting/AdminHeader.jsx"))
const AdminBanner = lazy(() => import("./AdminDashoard/SiteSetting/AdminBanner.jsx"))
const AdminFooter = lazy(() => import("./AdminDashoard/SiteSetting/AdminFooter.jsx"))
const AdminSoftware = lazy(() => import("./AdminDashoard/AdminSoftware/AdminSoftware.jsx"))
const AdminRunningProject = lazy(() => import("./AdminDashoard/Run&NewProject/AdminRunningProject.jsx"))
const AdminNewProject = lazy(() => import("./AdminDashoard/Run&NewProject/AdminNewProject.jsx"))
const Estore = lazy(() => import("./pages/estore.jsx"))
const Support = lazy(() => import("./pages/Contact/support.jsx"))
const Oneclickproduct = lazy(() => import("./pages/oneclickproduct.jsx"))
const Service = lazy(() => import("./pages/Estimate/service.jsx"))
const PoGenerator = lazy(() => import("./pages/PoUpload/PoGenerator.jsx"))
const Software = lazy(() => import("./pages/software.jsx"))
const Hardware = lazy(() => import("./pages/Hardware.jsx"))
const TrackService = lazy(() => import("./pages/TrackService.jsx"))
const ServicePartner = lazy(() => import("./pages/ServicePartner.jsx"))
const WorkFoxboro = lazy(() => import("./pages/WorkFoxboro/workFoxboro.jsx"))
const ServiceEstimate = lazy(() => import("./AdminDashoard/ServiceManager/SeviceEstimate.jsx"))
const ServiceUploadPO = lazy(() => import("./AdminDashoard/ServiceManager/ServiceUploadPO.jsx"))

function App() {

  const route = useRoutes([
    { path: '/', element: <Content /> },
    { path: '/product', element: <Product /> },
    { path: '/estore', element: <Estore /> },
    { path: '/support', element: <Support /> },
    { path: '/products/:categoryId/:categoryName', element: <Oneclickproduct /> },
    { path: '/service', element: <Service /> },
    { path: '/poGenerator', element: <PoGenerator /> },
    { path: '/software', element: <Software /> },
    { path: '/hardware', element: <Hardware /> },
    { path: '/login', element: <Login /> },
    { path: '/signUp', element: <SignUp /> },
    { path: '/forget', element: <Forget /> },
    { path: '/trackService', element: <TrackService /> },
    { path: '/servicePartner', element: <ServicePartner /> },
    { path: '/workFoxboro', element: <WorkFoxboro /> },

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
        { path: "adminRunningProject", element: <AdminRunningProject /> },
        { path: "adminNewProject", element: <AdminNewProject /> },
        { path: "serviceEstimate", element: <ServiceEstimate /> },
        { path: "serviceUploadPO", element: <ServiceUploadPO /> },

      ]
    }



  ])

  return (
    <>
      <Suspense fallback={<div>Loadings...</div>}>

        {route}

      </Suspense>

    <ToastContainer/>
      
    </>
  );
}

export default App;

// import React, { lazy, Suspense } from "react";
// import { useRoutes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "./protectedRoute.jsx";

// const Login = lazy(() => import("./AuthCycle/Login/login.jsx"));
// const SignUp = lazy(() => import("./AuthCycle/SignUp/signUp.jsx"));
// const Forget = lazy(() => import("./AuthCycle/Forget/forget.jsx"));
// const Product = lazy(() => import("./pages/product.jsx"));
// const Content = lazy(() => import("./pages/content.jsx"));
// const AdminLayout = lazy(() => import("./AdminDashoard/AdminLayout.jsx"));
// const Automation = lazy(() =>
//   import("./AdminDashoard/Category/Automation.jsx")
// );
// const CategoryProduct = lazy(() =>
//   import("./AdminDashoard/Category/CategoryProduct.jsx")
// );
// const AdminProduct = lazy(() =>
//   import("./AdminDashoard/AdminProduct/AdminProduct.jsx")
// );
// const AdminService = lazy(() => import("./AdminDashoard/AdminService.jsx"));
// const AdminHeader = lazy(() =>
//   import("./AdminDashoard/SiteSetting/AdminHeader.jsx")
// );
// const AdminBanner = lazy(() =>
//   import("./AdminDashoard/SiteSetting/AdminBanner.jsx")
// );
// const AdminFooter = lazy(() =>
//   import("./AdminDashoard/SiteSetting/AdminFooter.jsx")
// );
// const AdminSoftware = lazy(() =>
//   import("./AdminDashoard/AdminSoftware/AdminSoftware.jsx")
// );
// const AdminRunningProject = lazy(() => import("./AdminDashoard/Run&NewProject/AdminRunningProject.jsx"))
// const AdminNewProject = lazy(() => import("./AdminDashoard/Run&NewProject/AdminNewProject.jsx"))
// const Estore = lazy(() => import("./pages/estore.jsx"));
// const Support = lazy(() => import("./pages/support.jsx"));
// const Oneclickproduct = lazy(() => import("./pages/oneclickproduct.jsx"));
// const Service = lazy(() => import("./pages/service.jsx"));
// const PoGenerator = lazy(() => import("./pages/PoGenerator.jsx"));
// const Software = lazy(() => import("./pages/software.jsx"));
// const Hardware = lazy(() => import("./pages/Hardware.jsx"));
// const TrackService = lazy(() => import("./pages/TrackService.jsx"));

// function App() {
//   const { user } = useSelector((state) => state.auth);
//   console.log("the user data from app.jsx :", user);

//   const route = useRoutes([
//     { path: "/", element: <Content /> },
//     { path: "/product", element: <Product /> },
//     { path: "/estore", element: <Estore /> },
//     { path: "/support", element: <Support /> },
//     {
//       path: "/products/:categoryId/:categoryName",
//       element: <Oneclickproduct />,
//     },
//     { path: "/service", element: <Service /> },
//     { path: "/poGenerator", element: <PoGenerator /> },
//     { path: "/software", element: <Software /> },
//     { path: "/hardware", element: <Hardware /> },
//     { path: "/login", element: <Login /> },
//     { path: "/signUp", element: <SignUp /> },
//     { path: "/forget", element: <Forget /> },
//     { path: "/trackService", element: <TrackService /> },

//     {
//       path: "/admin",
//       element: (
//         <ProtectedRoute allowedRoles={["admin"]}>
//           <AdminLayout />
//         </ProtectedRoute>
//       ),
//       children: [
//         { path: "categoryProduct/:categoryId", element: <CategoryProduct /> },
//         { path: "automation", element: <Automation /> },
//         { path: "adminProduct", element: <AdminProduct /> },
//         { path: "adminService", element: <AdminService /> },
//         { path: "adminHeader", element: <AdminHeader /> },
//         { path: "adminBanner", element: <AdminBanner /> },
//         { path: "adminFooter", element: <AdminFooter /> },
//         { path: "adminSoftware", element: <AdminSoftware /> },
//         { path: "adminRunningProject", element: <AdminRunningProject /> },
//         { path: "adminNewProject", element: <AdminNewProject /> },
//       ],
//     },
//   ]);

//   return (
//     <>
//       <Suspense fallback={<div>Loadings...</div>}>{route}</Suspense>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;