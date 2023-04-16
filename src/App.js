import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Page2 from "./pages/Page2";
import SearchPage from "./pages/SearchPage";
import MyJam from "./pages/MyJam";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/page2/:userId", element: <Page2 /> },
        // { path: "/page2/:jamSessionId", element: <Page2 /> },
        { path: "/searchPage", element: <SearchPage /> },
        { path: "/my-jam/:userId", element: <MyJam /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
