import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/page2", element: <Page2 /> },
        { path: "/page3", element: <Page3 /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
