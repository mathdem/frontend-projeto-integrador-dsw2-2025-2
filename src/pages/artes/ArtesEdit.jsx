import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import Image from '../../components/Image';

const ArtesEdit = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [Usuarios_id, setUsuarios_Id] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nome, setNome] = useState("");
  const [palavras_chave, setPalavras_chave] = useState("");
  const [url_imagem, setUrl_imagem] = useState("");
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
            setNome(data.nome);
            setPalavras_chave(data.palavras_chave); 
            setUrl_imagem(data.url_imagem); 


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
        descricao: descricao,
        nome: nome,
        palavras_chave: palavras_chave,
        url_imagem: url_imagem
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
      <div className=' fs-4 m-5'>
        {erro && <div className="alert alert-danger">{erro}</div>}
        
        <form onSubmit={handleUpdate} className='m-5'>
            <div className="text-center">
                <Image />
            </div>
            <div className='bg-purple text-light m-5 border rounded p-5'>
                     <h1>Editar arte "{nome}"</h1>
                
                <div className="mb-3">
                    <label className='form-label' htmlFor="nomeArte">Nome:</label>
                    <input 
                        className='form-control' 
                        type="text" 
                        id="nomeArte"  
                        name='nome'
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className='form-label' htmlFor="imagem">imagem:</label>
                    <input 
                        className='form-control' 
                        type="file" 
                        id="imagem"  
                        name='url_imagem'
                        onChange={(e) => setUrl_imagem(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className='form-label' htmlFor="usuario">ID</label>
                    <input 
                        className='form-control' 
                        type="number" 
                        id="usuario"  
                        name='usuario'
                        value={Usuarios_id} 
                        onChange={(e) => setUsuarios_Id(e.target.value)}
                        required
                    />
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="desc" className='form-label'>descrição:</label>
                    <textarea 
                        id="desc" 
                        className='form-control' 
                        name='descricao'
                         type="text"
                        rows="4"
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <label htmlFor="palavrasChave" className='form-label'>Palavras Chave:</label>
                    <textarea 
                        id="palavrasChave" 
                        className='form-control' 
                        type="text"
                        name='palavras_chave'
                        rows="4"
                        value={palavras_chave} 
                        onChange={(e) => setPalavras_chave(e.target.value)}
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
    </>
  )
}

export default ArtesEdit;