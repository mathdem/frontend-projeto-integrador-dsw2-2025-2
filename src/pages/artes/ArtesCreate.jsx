import React from 'react'
import Image from '../../components/Image'
import Navbar from '../../components/Navbar'

const ArtesCreate = () => {
    return (
        <>
                <Navbar />
            <div className='text-center fs-4'>
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
            </div>
        </>
    )
}

export default ArtesCreate
