import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import MyJam from "./pages/MyJam";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/page2/:userId", element: <Page2 /> },
        { path: "/page3", element: <Page3 /> },
        { path: "/my-jam/:userId", element: <MyJam /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
