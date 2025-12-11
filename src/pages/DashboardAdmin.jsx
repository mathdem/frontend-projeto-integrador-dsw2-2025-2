import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';







const DashboardAdmin = () => {
    const [artes, setArtes] = useState([]);
const [erro, setErro] = useState(null);
const [storedUser, setStoredUser] = setStoredUser(null);
    const parsedUser = JSON.parse(storedUser);
 

    // Função para deletar
    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        
        const token = localStorage.getItem("token"); // Assumindo que guardou o token aqui
        
        try {
            const response = await fetch(`http://localhost:3000/api/artes/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove da tela sem recarregar a página
                setArtes(artes.filter(m => m.id !== id));
            } else {
                alert("Erro ao excluir. Verifique se você tem permissão.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        }
    };

    // Função para carregar artes
    useEffect(() => {

    
        setUser(parsedUser);


        const fetchartes = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:3000/api/artes", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if(!response.ok) throw new Error("Erro ao buscar dados");
                const data = await response.json();
                setArtes(data);
            } catch (err) {
                setErro(err.message);
            }
        }
        fetchartes();

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

    }, []);

    if (erro) return <div className="alert alert-danger">{erro}</div>;

    return (
        <>   
        <Navbar/>
        <div className='row'>
            {artes.map(artes =>
                <div className='col-lg-6 col-12 my-2' key={artes.id}>
                    <div className="card text-center h-100">
                        <div className="card-header d-flex justify-content-between">
                            <span>Usuario: {artes.Usuarios_id}</span>
                            <span>Nome: {artes.nome}</span>
                            <span>descrição: {artes.descricao}</span>
                            <span>Palavras chave: {artes.palavras_chave}</span>
                            <span>data de concepção: {artes.data_concepcao}</span>
                            <span>data de criação: {artes.data_criacao}</span>
                            <span>data atualização: {artes.data_atualizacao}</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">ID: {artes.id}</h5>
                            <img src={artes.url_imagem}/>
                            <p className="card-text text-start p-2 bg-light rounded">{artes.artes}</p>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                                <Link to={`/artes/edit/${artes.id}`} className='btn btn-primary'>
                                    <i className="bi bi-pencil"></i> Editar
                                </Link>

                                <button onClick={() => handleDelete(artes.id)} className='btn btn-danger'>
                                    <i className="bi bi-trash"></i> Excluir
                                </button>
                            </div>
                        </div>
                        <div className="card-footer text-body-secondary">
                           Enviado em: {new Date(artes.data_criacao || Date.now()).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default DashboardAdmin