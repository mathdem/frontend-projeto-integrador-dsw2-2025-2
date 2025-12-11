import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom'

const ArtesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [Usuarios_id, setUsuarios_Id] = useState("");
    const [descricao, setDescricao] = useState("");
    const [nome, setNome] = useState("");
    const [palavras_chave, setPalavras_chave] = useState("");
    
    // Armazena o arquivo (objeto File) para envio
    const [arquivoImagem, setArquivoImagem] = useState(null); 
    // Armazena a URL antiga apenas para preview (opcional) ou lógica visual
    const [previewImagem, setPreviewImagem] = useState(""); 
    
    const [erro, setErro] = useState(null);

    // Carregar dados
    useEffect(() => {
        const fetchArtes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/artes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error("Arte não encontrada");

                const data = await response.json();

                setUsuarios_Id(data.Usuarios_id);
                setDescricao(data.descricao || "");
                setNome(data.nome);
                setPalavras_chave(data.palavras_chave || "");
                setPreviewImagem(data.url_imagem); // URL vinda do banco

            } catch (error) {
                setErro(error.message);
            }
        };
        fetchArtes();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("Usuarios_id", Usuarios_id);
        formData.append("nome", nome);
        formData.append("palavras_chave", palavras_chave);
        formData.append("descricao", descricao);

        // Só anexa a imagem se o usuário tiver selecionado um novo arquivo
        if (arquivoImagem) {
            formData.append("url_imagem", arquivoImagem);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/artes/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // IMPORTANTE: Não definir Content-Type aqui ao usar FormData
                },
                body: formData // Envia o FormData direto, SEM JSON.stringify
            });

            if (!response.ok) throw new Error("Erro ao atualizar artes");

            alert("Arte atualizada com sucesso!");
            navigate("/artes");

        } catch (error) {
            setErro(error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className='fs-4 m-5'>
                {erro && <div className="alert alert-danger">{erro}</div>}

                <form onSubmit={handleUpdate} className='m-5'>
                    <div className="text-center">
                        {/* Mostra a imagem atual se existir */}
                        {previewImagem && <img src={previewImagem} alt="Preview" style={{maxWidth: '200px'}} />}
                    </div>
                    <div className='bg-purple text-light m-5 border rounded p-5'>
                        <h1>Editar arte "{nome}"</h1>

                        <div className="mb-3">
                            <label className='form-label'>Nome:</label>
                            <input className='form-control' type="text" 
                                value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Imagem (Deixe vazio para manter a atual):</label>
                            <input
                                className='form-control'
                                type="file"
                                accept="image/*"
                                // CORREÇÃO: Usar e.target.files[0]
                                onChange={(e) => setArquivoImagem(e.target.files[0])}
                            />
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>ID Usuário:</label>
                            <input className='form-control' type="number" 
                                value={Usuarios_id} onChange={(e) => setUsuarios_Id(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Descrição:</label>
                            <textarea className='form-control' rows="4" 
                                value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Palavras Chave:</label>
                            <textarea className='form-control' rows="4" 
                                value={palavras_chave} onChange={(e) => setPalavras_chave(e.target.value)} required></textarea>
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