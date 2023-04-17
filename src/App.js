import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import JamFormPage from "./pages/JamFormPage";
import SearchPage from "./pages/SearchPage";
import MyJamPage from "./pages/MyJamPage";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/JamFormPage/:userId", element: <JamFormPage /> },
        { path: "/searchPage", element: <SearchPage /> },
        { path: "/my-jam/:userId", element: <MyJamPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
