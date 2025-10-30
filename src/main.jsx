// src/main.jsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App.jsx";
import Sobre from "./pages/Sobre.jsx";
import Contato from "./pages/Contato.jsx";

import ArtesIndex from "./pages/artes/ArtesIndex.jsx";
import ArtesCreate from "./pages/artes/ArtesCreate.jsx";
import ArtesShow from "./pages/artes/ArtesShow.jsx";
import ArtesEdit from "./pages/artes/ArtesEdit.jsx";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/sobre", element: <Sobre /> },
    { path: "/contato", element: <Contato /> },
    { path: "/artes", element: <ArtesIndex />},
    { path: "/artes/Create", element: <ArtesCreate />},
    { path: "/artes/:id", element: <ArtesShow />},
    { path: "/artes/:id/edit", element: <ArtesEdit />}
]);
createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);