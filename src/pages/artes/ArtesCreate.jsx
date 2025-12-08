import React, { useState } from 'react'
import Image from '../../components/Image'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ArtesCreate = () => {
    const [Usuarios_id, setUsuarios_Id] = useState("");
    const [nome, setNome] = useState("");
    const [url_imagem, setUrl_imagem] = useState(null);
    const [data_concepcao, setDataConcepcao] = useState();
    const [palavras_chave, setPalavrasChave] = useState();
    const [descricao, setDescricao] = useState();
    const [erro, setErro] = useState("");

    const navigate = useNavigate();
    const enviaFormulario = async (e) => {
        e.preventDefault();
        setErro("");

        const token = localStorage.getItem('token');
        if (!token) {
            setErro("Você precisa estar logado para postar sua arte.");
            return;
        }

         // Para envio de arquivos, usamos FormData
    const formData = new FormData();
    formData.append("Usuarios_id", Usuarios_id);
    formData.append("nome", nome);
    formData.append("data_concepcao", data_concepcao);
    formData.append("palavras_chave", palavras_chave);
    formData.append("descricao", descricao);

    if (url_imagem) {
        formData.append("url_imagem", url_imagem); // 'imagem' deve ser o mesmo nome usado no upload.single('imagem') do backend
    }

        try {
            const response = await fetch("http://localhost:3000/api/artes", {
                method: "POST",
                body: formData,
                headers: {
                        'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Não foi possivel salvar");
            navigate("/artes");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />
            <div className=' fs-4 m-5 '>
                <form onSubmit={enviaFormulario} className='m-5'>
                    <div className="text-center">
                        <Image />
                    </div>
                    <div className="bg-purple text-light m-5 border rounded p-5">
                        <h1 className='text-center'>Criar Arte</h1>

                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'> Selecione a imagem</label> <br />
                            <input type="file"
                                className=''
                                accept="image/*"
                                onChange={(e) => setUrl_imagem(e.target.files[0])}  />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className='form-label'>Nome</label><br />
                            <input
                                type="text"
                                className='border rounded p-2 '
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className='form-label'>Data</label> <br />
                            <input
                                type="date"
                                className="border rounded p-2"
                                value={data_concepcao}
                                onChange={(e) => setDataConcepcao(e.target.value)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'>Palavras chave</label> <br />
                            <textarea
                                name=""
                                id=""
                                className='border rounded p-2'
                                value={palavras_chave}
                                onChange={(e) => setPalavrasChave(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='mb-3'>


                            <label htmlFor="" className='form-label'>Descrição</label> <br />
                            <textarea
                                name=""
                                id=""
                                className='border rounded p-2'
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            ></textarea>

                        </div>


                        <button type='submit' className="border rounded px-2 pt-1 pb-2">
                            <span>Postar</span>
                        </button>
                        {erro && <div >{erro}</div>}
                        <Link to="/artes" className="bg-purple text-light border border-3 rounded px-2 pt-1 pb-2 m-5">Voltar</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ArtesCreate
