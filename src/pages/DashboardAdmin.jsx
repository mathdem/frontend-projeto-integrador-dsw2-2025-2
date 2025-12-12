import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardAdmin = () => {
    const [artes, setArtes] = useState([]);
    const [erro, setErro] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // Carregar usuário e validar acesso
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("É preciso fazer login");
            navigate("/usuario/login");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.papel !== 0) {
            alert("Acesso negado. Apenas administradores.");
            navigate("/login");
            return;
        }

    }, [navigate]);

    // Carregar artes
    useEffect(() => {
        const fetchArtes = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://localhost:3000/api/artes", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("Erro ao buscar dados");

                const data = await response.json();
                setArtes(data);

            } catch (err) {
                setErro(err.message);
            }
        };

        fetchArtes();

    }, []);

    // Função de deletar
    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir?")) return;

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3000/api/artes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                setArtes(prev => prev.filter(m => m.id !== id));
            } else {
                alert("Erro ao excluir.");
            }

        } catch (error) {
            alert("Erro de conexão.");
        }
    };

    if (erro) return <div className="alert alert-danger">{erro}</div>;
    if (!user) return null; // evita render prematuro

    return (
        <>
            <Navbar />
            <div className='row '>
                {artes.map(arte =>
                    <div className='col-lg-3 col-3 my-2 ' key={arte.id}>
                        <div className="card text-center h-100 " >
                            <div className="card-header d-flex justify-content-between ">
                                <span>Usuario: {arte.Usuarios_id}</span>
                                <span>Nome: {arte.nome}</span>
                                <span>Descrição: {arte.descricao}</span>
                                <span>Palavras-chave: {arte.palavras_chave}</span>
                                <span>Data concepção: {arte.data_concepcao}</span>
                                <span>Data criação: {arte.data_criacao}</span>
                                <span>Atualização: {arte.data_atualizacao}</span>
                            </div>
                            <div className="card-body ">
                                <h5 className="card-title">ID: {arte.id}</h5>
                                <img className="arte-img" src={arte.url_imagem} alt={arte.nome} />
                                <div className="d-flex justify-content-center gap-2 mt-3">
                                    <Link to={`/artes/edit/${arte.id}`} className='btn btn-primary'>
                                        <i className="bi bi-pencil"></i> Editar
                                    </Link>
                                    <button onClick={() => handleDelete(arte.id)} className='btn btn-danger'>
                                        <i className="bi bi-trash"></i> Excluir
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer text-body-secondary">
                                Enviado em: {new Date(arte.data_criacao).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DashboardAdmin;
