import React, { useState } from 'react'
import Image from '../../components/Image'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ArtesCreate = () => {
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [data_concepcao, setDataConcepcao] = useState();
    const [palavras_chave, setPalavrasChave] = useState();
    const [descricao, setDescricao] = useState();

    const navigate = useNavigate();
    const enviaFormulario = async(e) => {
        e.preventDefault();
        const dadosEnviados = JSON.stringify({
            "Usuarios_id": 1,
            nome,
            "url_imagem": imagem,
            data_concepcao,
            palavras_chave,
            descricao,
            
        });

try {
            const response = await fetch("http://localhost:3000/api/artes", {
                method: "POST",
                body: dadosEnviados,
                headers: {
                    "Content-Type":"appNlication/json" 
                }
            });
            if(!response.ok) throw new Error("Não foi possivel salvar");
            navigate("/artes");
} catch (error) {
    console.log(error);
}
    }
    return (
        <>
            <Navbar />
            <div className=' fs-4 m-5'>
                <form onSubmit={enviaFormulario}>
                    <Image />
                    <input type="file" 
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}/>
                    <div className="bg-purple text-light m-5 border rounded p-5">
                        <label htmlFor="">Nome</label><br />
                        <input
                         type="text" 
                         className='border rounded p-2 '
                         value={nome}
                         onChange={(e) => setNome(e.target.value)}
                        /> <br />
                        <br />
                        <label htmlFor="">data</label> <br />
                        <input 
                        type="date" 
                        className="border rounded p-2" 
                        value={data_concepcao}
                        onChange={(e) => setDataConcepcao(e.target.value)}
                        /> <br />
                        <br />
                        <label htmlFor="">palavras chave</label> <br />
                        <textarea 
                        name="" 
                        id="" 
                        className='border rounded p-2'
                        value={palavras_chave}
                        onChange={(e) => setPalavrasChave(e.target.value)}
                        ></textarea> <br />
                        <br />
                        <label htmlFor="">Descrição</label> <br />
                        <textarea
                         name="" 
                         id="" 
                         className='border rounded p-2'
                         value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        ></textarea> <br />
                        <br />
                        <button type='submit'className="border rounded px-2 pt-1 pb-2">
                            <span>postar</span>
                        </button>
                    </div>
                </form>
                <Link to="/artes" className="bg-purple text-light border rounded p-3 m-2">Voltar</Link>
            </div>
        </>
    )
}

export default ArtesCreate
