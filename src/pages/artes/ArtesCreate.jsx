import React from 'react'
import Image from '../../components/Image'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const ArtesCreate = () => {
    return (
        <>
                <Navbar />
            <div className='text-center fs-4 m-2'>
                <Image />
                <div className="bg-purple text-light m-5 border rounded p-5">
                <label htmlFor="">Nome</label><br />
                <input type="text" /> <br />
                <br />
                <label htmlFor="">data</label> <br />
                <input type="date" /> <br />
                <br />
                <label htmlFor="">palavras chave</label> <br />
                <textarea name="" id=""></textarea> <br />
                <br />
                <label htmlFor="">Descrição</label> <br />
                <textarea name="" id=""></textarea> <br />
                <br />
                <button className=''>
                    postar</button>
                </div>
                <Link to="/artes" className="bg-purple text-light border rounded p-3 m-2">Voltar</Link>
            </div>
        </>
    )
}

export default ArtesCreate
