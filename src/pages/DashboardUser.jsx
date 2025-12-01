import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DashboardUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }
        const parsedUser = JSON.parse(storedUser);

        // Verificação de papel (1 = Usuário)
        if (parsedUser.papel !== 1) {
            // Se for admin tentando acessar, pode redirecionar ou apenas avisar
            if (parsedUser.papel === 1) {
                navigate("/dashboard/admin");
                return;
            }
        }
        setUser(parsedUser);
    }, [navigate]);

    if (!user) return null;

    return (
        <>
            <div>
                <div>
                    <div>
                        <h1>Olá, {user.nome}!</h1>
                        <p>Bem-vindo ao seu painel de usuário.</p>
                        <div>
                            <Link to="/artes">Ver Artes</Link>
                            <Link to="/artes/create">Nova Arte</Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            <h2>Minha Conta</h2>
                            <p>Gerencie suas informações pessoais, email e senha de acesso.</p>
                            <Link to="/profile">Ir para Perfil</Link>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2>Suporte</h2>
                            <p>Precisa de ajuda? Entre em contato com a administração ou veja o sobre nós.</p>
                            <Link to="/contato">Contato</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardUser;
