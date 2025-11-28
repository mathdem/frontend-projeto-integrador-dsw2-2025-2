import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useContext } from "react";
import { AuthContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", senha: "" });
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await login(form.email, form.senha);
        navigate("/perfil");
      } catch (error) {
        console.error(error);
        alert("Login falhou!");
      }
    };
  


    return (
        <>
            <Navbar />
            <div className='text-center p-5'>
                <h2 className='purple'>Bem vindo de volta</h2>
                <br />
                <form onSubmit={handleLogin}>
                    <div className='border-purple p-5 m-2'>
                        <div className=''>
                        <label htmlFor="email">email</label><br />
                        <input name='email' type="text" onChange={e => setForm({...form, email: e.target.value})}/> <br /><br />

                        <label htmlFor="senha">senha</label><br />
                        <input name='senha' type="password" onChange={e => setForm({...form, senha: e.target.value})}/> <br /><br />

                        <br /><br />
                        <button className='border-purple bg-transparent p-2 borer rounded'>entrar</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Login