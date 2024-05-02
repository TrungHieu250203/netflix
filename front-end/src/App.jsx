import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/index";
import DefaultLayout from "./layouts/default";

function App() {
  const token = sessionStorage.getItem("token") || "";
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if(route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }
            if(!token) {
              return <Route key={ index } path={ route.path } element={ <Layout><Page /></Layout> } />
            } 
          })}
          
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if(route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }
            if(token) {
              return <Route key={ index } path={ route.path } element={ <Layout><Page /></Layout> } />
            } 
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
