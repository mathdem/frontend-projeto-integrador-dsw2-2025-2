import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


const Registrar = () => {
    const [form, setForm] = useState({ nome: "", email: "", senha: "", papel: "1" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Converte papel para número antes de enviar
        const dadosParaEnviar = {
            ...form,
            papel: Number(form.papel)
        };

        try {
            const response = await fetch("http://localhost:3000/api/usuarios/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.erro || "Erro ao cadastrar");
                return;
            }

            // Login automático após cadastro
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Conta criada com sucesso!");

            // Redireciona
            if (data.user.papel === 0) {
                navigate("/dashboard/admin");
            } else {
                navigate("/dashboard/user");
            }

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão com o servidor.");
        }
    };

    return (
        <>
            <Navbar />
            <div className='text-center m-3'>
            <img className="w-50 h-auto " src="/sejaBemVindo.gif" alt="Imagem placeholder"/>
                <h1 className='purple'>Cadastrar</h1>
                <div className='p-4 border-purple' >
                    <div className='p-2'>
                    <form onSubmit={handleSubmit}>
                        <div className='m-2'>
                            <label htmlFor="nome">Nome do Usuário</label> <br />
                            <input type="text" name="nome" id="nome" placeholder='nome' value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
                        </div>
                        <div  className='m-2'>
                            <label htmlFor="email">Email</label> <br />
                            <input type="email" name="email" id="email" placeholder='email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        </div>
                        <div  className='m-2'>
                            <label htmlFor="senha">Senha</label> <br />
                            <input type="password" name="senha" id="senha" placeholder='senha' value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} required />
                        </div>
                        <div >
                            <label htmlFor="papel">Selecionar Papel</label> <br />
                            <select name="papel" id="papel" value={form.papel} onChange={e => setForm({ ...form, papel: e.target.value })} required>
                                <option value="1">Usuário</option>
                                <option value="0">Administrador</option>
                            </select>
                        </div> <br />
                        <button type="submit" className='bg-purple border-0 text-light p-3 rounded'>Cadastrar</button>
                    </form>
                <div>
                    <br/>
                    <p className=''>Já tem uma conta? <Link to="/login">Fazer Login!</Link></p>
                </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registrar