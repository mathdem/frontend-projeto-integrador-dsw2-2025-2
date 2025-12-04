import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom'

const ArtesEdit = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [Usuarios_id, setUsuarios_Id] = useState("");
  const [descricao, setDescricao] = useState("");
  const [artes, setArtes] = useState("");
  const [erro, setErro] = useState(null);

  // Carregar dados da artes ao abrir a tela
  useEffect(() => {
    const fetchArtes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/artes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("artes não encontrada ou erro de permissão");
            
            const data = await response.json();
            
            // Preenche os estados com os dados recebidos
            setUsuarios_Id(data.Usuarios_id);
            setDescricao(data.descricao); 
            setArtes(data.artes);

        } catch (error) {
            setErro(error.message);
        }
    };

    fetchArtes();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const dadosAtualizados = {
        Usuarios_id: Number(Usuarios_id),
        Usuarios_id_destinatario: Number(Usuarios_id_destinatario),
        artes
    };

    try {
        const response = await fetch(`http://localhost:3000/api/artes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) throw new Error("Erro ao atualizar artes");

        alert("artes atualizada com sucesso!");
        navigate("/artes");

    } catch (error) {
        setErro(error.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className='container mt-4'>
        {erro && <div className="alert alert-danger">{erro}</div>}
        
        <form onSubmit={handleUpdate}>
            <div className='card border-secondary p-4'>
                <p className='fs-2 text-center'>Editar artes #{id}</p>
                
                <div className="mb-3">
                    <label className='form-label' htmlFor="usuario">ID Remetente:</label>
                    <input 
                        className='form-control' 
                        type="number" 
                        id="usuario"  
                        value={Usuarios_id} 
                        onChange={(e) => setUsuarios_Id(e.target.value)}
                        required
                    />
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="descricao" className='form-label'>descrição:</label>
                    <textarea 
                        id="descricao" 
                        className='form-control' 
                        rows="4"
                      
                        value={descricao} 
                        onChange={(e) => setArtes(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type='submit' className='btn btn-lg btn-primary w-100'>
                    <i className="bi bi-save"></i> Salvar Alterações
                </button>
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate("/artes")}>
                    Cancelar
                </button>
            </div>
        </form>
      </div>
      <div className="mt-5">
      </div>
    </>
  )
}

export default ArtesEdit;