
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';
import { createRoot } from "react-dom/client";
import Protected from './app/Protected';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './Pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home></Home></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element:<Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
]);


function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}
export default App;
