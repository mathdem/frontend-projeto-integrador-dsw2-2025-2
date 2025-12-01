import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.erro || "Erro ao fazer login");
                return;
            }

            // Salva token e usuário no localStorage
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login realizado com sucesso!");

            // Redireciona baseado no papel (0 = Admin, 1 = Usuário)
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
            <h1 className='purple'>Entrar</h1>
            <div className='p-4 border-purple'>
              <div className='p-2'>
                <form onSubmit={handleLogin}>
                    <div className='m-2'>
                      <label htmlFor="email">Email</label> <br />
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='name@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='m-2'>
                      <label htmlFor="senha">Senha</label> <br />
                        <input 
                            type="password" 
                            name="senha" 
                            id="senha" 
                            placeholder='Password'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" className='bg-purple border-0 text-light p-3 rounded'>Entrar</button>
                </form>
            </div>
            <div>
                <p>Novo por aqui? <Link to="/registrar">Cadastrar aqui!</Link></p>
            </div>
              </div>
        </div>
        </>
    )
}

export default Login