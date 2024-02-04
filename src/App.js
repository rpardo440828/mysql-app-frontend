import logo from './logo.svg';
import './App.css';
import { AuthContext } from './context/authContext'; 
import Home from './pages/Home';
import Books from './pages/Books/Books';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";
import AddB from './pages/Books/AddB';
import UpdateB from './pages/Books/UpdateB';
import Movies from './pages/Movies/Movies';
import AddM from './pages/Movies/AddM';
import UpdateM from './pages/Movies/UpdateM';
import Shows from './pages/Shows/Shows';
import AddS from './pages/Shows/AddS';
import UpdateS from './pages/Shows/UpdateS';
import { useContext } from 'react';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/books/:id",
        element: <Books />
      },
      {
        path: "/books/add/:id",
        element: <AddB />
      },
      {
        path: "/books/update/:id/:bid",
        element: <UpdateB />
      },
      {
        path: "/movies/:id",
        element: <Movies />
      },
      {
        path: "/movies/add/:id",
        element: <AddM />
      },
      {
        path: "/movies/update/:id/:bid",
        element: <UpdateM />
      },
      {
        path: "/shows/:id",
        element: <Shows />
      },
      {
        path: "/shows/add/:id",
        element: <AddS />
      },
      {
        path: "/shows/update/:id/:bid",
        element: <UpdateS />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

function App() {
  const { logout } = useContext(AuthContext);

  window.onunload = {logout};
  return (
    <div className="app">
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
