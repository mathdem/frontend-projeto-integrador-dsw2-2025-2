import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useContext } from "react";
import { AuthContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
    const { registrar } = useContext(AuthContext);
    const [form, setForm] = useState({ nome: "", email: "", senha: "", papel: "0" });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registrar(form.nome, form.email, form.senha, Number(form.papel));
        alert("Conta criada com sucesso!");
        navigate("/perfil");
      } catch (error) {
        alert("Erro ao criar conta: " + (error.response?.data?.erro || "Desconhecido"));
      }
    };
    

        return (
            <>
                <Navbar />
                <div className='text-center p-5'>
                    <img src='sejaBemVindo.gif' />
                    <h2 className='purple'>Seja Bem vindo</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className='border-purple p-5 m-2'>
                            <div className=''>
                                <label htmlFor="nome">Nome</label><br />
                                <input
                                    name='nome'
                                    type="text"
                                    value="form.nome"
                                    onChange={e => setForm({ ...form, nome: e.target.value })}
                                    required /> <br /><br />

                                <label htmlFor="email">email</label><br />
                                <input name='email' type="text" /> <br /><br />

                                <label htmlFor="senha">senha</label><br />
                                <input name='senha' type="password" /> <br /><br />

                                <label htmlFor="papel">papel</label><br />
                                <select name="papel" id="">
                                    <option value="0">Usuario</option>
                                    <option value="1">Administrador</option>
                                </select>
                                <br /><br />
                                <button className='border-purple bg-transparent p-2 borer rounded'>entrar</button>
                            </div>

                        </div>
                    </form>
                </div>
            </>
        );
}