import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

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
            <div>
                <div>
                    <h1>Perfil de {user.nome}</h1>
                    <p>Papel: {user.papel === 0 ? "Administrador" : "Usuário"}</p>
                    <p>ID: {user.id}</p>

                    <hr />

                    <h3>Editar Dados</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Nome</label>
                            <input 
                                type="text" 
                                value={form.nome} 
                                onChange={e => setForm({...form, nome: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={form.email} 
                                onChange={e => setForm({...form, email: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label>Nova Senha (deixe vazio para não alterar)</label>
                            <input 
                                type="password" 
                                value={form.senha} 
                                onChange={e => setForm({...form, senha: e.target.value})} 
                            />
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