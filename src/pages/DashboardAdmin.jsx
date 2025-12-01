import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [listaUsuarios, setListaUsuarios] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/usuarios/login");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        
        // Verificação de papel (0 = Admin)
        if (parsedUser.papel !== 0) {
            alert("Acesso negado. Esta área é restrita para Administradores.");
            navigate("/dashboard/user"); // Redireciona para o dashboard correto
            return;
        }
        setUser(parsedUser);

        // Busca lista de usuários (Apenas Admin vê isso neste exemplo)
        const fetchUsuarios = async () => {
            try {
                // A rota GET /api/usuarios é pública no backend atual, mas aqui consumimos como exemplo de dado admin
                const response = await fetch("http://localhost:3000/api/usuarios");
                const data = await response.json();
                setListaUsuarios(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        fetchUsuarios();

    }, [navigate]);

    if (!user) return null;

    return (
        <>
            <div>
                <div>
                    <div>
                        <h1>Painel do Administrador</h1>
                        <p>Bem-vindo, {user.nome} (ID: {user.id}).</p>
                        <p>Você tem acesso total ao gerenciamento do sistema.</p>
                        <button onClick={() => navigate("/profile")}>Meu Perfil</button>
                    </div>
                </div>

                <h2>Gestão de Usuários</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaUsuarios.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nome}</td>
                                    <td>
                                        <button>Detalhes</button>
                                        <button>Remover</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardAdmin;
