import './App.css'

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/home/Home";
import Contributions from "./pages/contributions/Contributions";
import Error404 from "./pages/errors/Error404";

// Layout
import RouteLayout from "./layouts/RouteLayout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<Home />} />
      <Route path="contributors" element={<Contributions />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);


function App() {
  return <RouterProvider router={routes} />;
}

export default App
