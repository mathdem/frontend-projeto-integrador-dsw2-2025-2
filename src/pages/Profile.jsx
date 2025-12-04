import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import ThemeButton from '../components/ThemeButton';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ nome: "", email: "", senha: "" });

    // Carrega dados do localStorage ao iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setForm({ nome: parsedUser.nome, email: parsedUser.email, senha: "" });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/api/usuarios/logout", { method: "POST" });
        } catch (e) {
            console.error("Erro ao fazer logout no backend", e);
        }
        localStorage.clear();
        navigate("/login");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        // Prepara os dados para envio.
        const dadosParaEnviar = {
            nome: form.nome,
            email: form.email,
            senha: form.senha
        };

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.erro || "Erro ao atualizar");
                return;
            }

            // Atualiza localStorage e estado
            const newUser = { ...user, ...data };
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
            setForm({ ...form, senha: "" }); // Limpa a senha por segurança
            alert("Perfil atualizado com sucesso!");

        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.erro || "Erro ao excluir conta");
                return;
            }

            alert("Conta excluída.");
            localStorage.clear();
            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        }
    };

    if (!user) return <p>Carregando...</p>;

    return (
        <>
        <Navbar />
    
        <div className="p-2 row m-1">
    
            <div className='bg-purple rounded p-3 col-auto text-center'>
                
                <div className="ratio ratio-1x1 w-100 bg-light rounded-circle border border-dark border-light-subtle border-3" >
                    <img
                        src="/ft.gif"
                        className="w-100 h-100 object-fit-cover rounded-circle"
                        alt="Imagem"
                    />
                </div>
    
                <h1>{user.nome}</h1>
                <p>Papel: {user.papel === 0 ? "Administrador" : "Usuário"}</p>
                <p>ID: {user.id}</p>
            </div>
    
    
           
            <div className='col bg-purple rounded p-3 ms-3'>
                <h3>Editar Dados</h3>
    
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Nome</label> <br />
                        <input
                            type="text"
                            value={form.nome}
                            onChange={e => setForm({ ...form, nome: e.target.value })}
                            className='rounded border-0 '
                        />
                    </div>
    
                    <div>
                        <label>Email</label> <br /> 
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                             className='rounded border-0 '
                        />
                    </div>
    
                    <div>
                        <label>Nova Senha (deixe vazio para não alterar)</label> <br />
                        <input
                            type="password"
                            value={form.senha}
                            onChange={e => setForm({ ...form, senha: e.target.value })}
                             className='rounded border-0 '
                        />
                    </div>

                    <div>
                        <label>tema de fundo:</label> <br />
                        <ThemeButton />
                    </div>
    
                    <button type="submit">Salvar Alterações</button>
                </form>
    
                <hr />
    
                <div>
                    <button onClick={handleDelete}>Excluir Conta</button>
                    <button onClick={handleLogout}>Sair (Logout)</button>
                </div>
            </div>
    
        </div>
    </>
    
    )
}

export default Profile