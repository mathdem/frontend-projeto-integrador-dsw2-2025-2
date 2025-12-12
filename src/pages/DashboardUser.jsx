import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Arte from '../components/Arte';

const DashboardUser = () => {
    const [artes, setArtes] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Carregar usuário e validar acesso
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("É preciso fazer login");
            navigate("/usuarios/login");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Bloqueia admins
        if (parsedUser.papel === 0) { 
            alert("Acesso negado. Apenas usuários comuns.");
            navigate("/"); // redireciona para home ou outra página
            return;
        }

    }, [navigate]);

    // Carregar artes
    useEffect(() => {
        const fetchArtes = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/artes");
                if (!response.ok) throw new Error("Erro ao buscar artes");
                const data = await response.json();
                setArtes(data);
            } catch (error) {
                console.error("Erro ao buscar artes:", error);
            }
        };

        fetchArtes();
    }, []);

    if (!user) return null; // evita render prematuro

    return (
        <>
            <Navbar />
            <center>
                <img className="w-50 h-auto" src="/W_arts.gif" alt="Imagem placeholder" />
            </center>
            <div className="row m-0">
                {artes.map(arte => (
                    <Arte key={arte.id} arte={arte} />
                ))}
            </div>
        </>
    );
};

export default DashboardUser;
