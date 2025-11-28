// src/App.jsx

import Navbar from "../components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";


const App = () => {
    return (
        <div>
            <Navbar />
           
        </div>
    )
}
export default App