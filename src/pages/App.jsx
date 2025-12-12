// src/App.jsx

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";



const App = () => {
    return (
        <div className="">
            <Navbar />
            <div  className="text-center">
            <img src="Wellcome.gif" className=" w-50 "/>
            <div>
                <p><Link to="/registrar">Cadastrar aqui!</Link></p>
            </div>
            </div>
        </div>
    )
}
export default App