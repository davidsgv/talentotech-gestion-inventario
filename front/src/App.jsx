import Login from "./components/login/Login"
import Register from "./components/login/Register"
import ProductTable from "./components/productTable/ProductTable"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import "./assets/css/main.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <Root />,
    children: [
      {
        path: "products",
        element: <ProductTable />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
