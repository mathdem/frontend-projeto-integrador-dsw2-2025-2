import React, { useState } from 'react'
import Image from '../../components/Image'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

const ArtesCreate = () => {
    const [Usuarios_id, setUsuarios_Id] = useState("");
    const [nome, setNome] = useState("");
    const [arquivoImagem, setArquivoImagem] = useState(null); // Alterei nome para ficar claro que é File
    const [data_concepcao, setDataConcepcao] = useState("");
    const [palavras_chave, setPalavrasChave] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const enviaFormulario = async (e) => {
        e.preventDefault();
        setErro("");

        const token = localStorage.getItem('token');
        if (!token) {
            setErro("Você precisa estar logado.");
            return;
        }

        const formData = new FormData();
        formData.append("Usuarios_id", Usuarios_id);
        formData.append("nome", nome);
        formData.append("data_concepcao", data_concepcao);
        formData.append("palavras_chave", palavras_chave);
        formData.append("descricao", descricao);

        if (arquivoImagem) {
            // O nome "url_imagem" aqui deve ser igual ao upload.single("url_imagem") no backend
            formData.append("url_imagem", arquivoImagem); 
        } else {
            setErro("A imagem é obrigatória.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/artes", {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Content-Type NÃO deve ser definido aqui
                }
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.erro || "Erro ao salvar");
            }
            navigate("/artes");
        } catch (error) {
            setErro(error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className='fs-4 m-5'>
                <form onSubmit={enviaFormulario} className='m-5'>
                    <div className="text-center"><Image /></div>
                    <div className="bg-purple text-light m-5 border rounded p-5">
                        <h1 className='text-center'>Criar Arte</h1>

                        <div className='mb-3'>
                            <label className='form-label'>Selecione a imagem</label><br />
                            <input type="file" accept="image/*" className='form-control'
                                onChange={(e) => setArquivoImagem(e.target.files[0])} required />
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Nome</label><br />
                            <input type="text" className='form-control'
                                value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        
                        <div className="mb-3">
                            <label className='form-label'>ID Usuário</label><br />
                            <input type="number" className='form-control'
                                value={Usuarios_id} onChange={(e) => setUsuarios_Id(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Data Concepção</label><br />
                            <input type="date" className="form-control"
                                value={data_concepcao} onChange={(e) => setDataConcepcao(e.target.value)} />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Palavras chave</label><br />
                            <textarea className='form-control'
                                value={palavras_chave} onChange={(e) => setPalavrasChave(e.target.value)}></textarea>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Descrição</label><br />
                            <textarea className='form-control'
                                value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </div>

                        <button type='submit' className="btn btn-light px-4">Postar</button>
                        {erro && <div className="mt-3 text-warning">{erro}</div>}
                        <Link to="/artes" className="btn btn-outline-light ms-3">Voltar</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ArtesCreate