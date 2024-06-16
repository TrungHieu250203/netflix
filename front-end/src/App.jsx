import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes, adminPublicRoutes, adminPrivateRoutes } from "./routes/index";
import DefaultLayout from "./layouts/default";
import AdminLayout from "./layouts/admin-layout";
import AdminLayoutNoLogin from "./layouts/admin-layout-no-login";
import { isTokenPresent, isAdminTokenPresent } from "./utils/auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {isTokenPresent() &&
                    (route.path === "/vn-en" || route.path === "/auth/login" || route.path === "/auth/register") ? (
                      <Navigate to="/" />
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {isTokenPresent() ? (
                      <Page />
                    ) : (
                      <Navigate to="/auth/login" />
                    )}
                  </Layout>
                }
              />
            );
          })}

          {adminPublicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = AdminLayoutNoLogin;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {isAdminTokenPresent() && (route.path === "/admin/login") ? (
                      <Navigate to="/admin/dashboard" />
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }
              />
            );
          })}

          {adminPrivateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = AdminLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {isAdminTokenPresent() ? (
                      <Page />
                    ) : (
                      <Navigate to="/admin/login" />
                    )}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
