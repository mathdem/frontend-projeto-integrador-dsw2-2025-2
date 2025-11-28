import React from 'react'
import Navbar from '../components/Navbar'


const Registrar = () => {
    return (
        <>
            <Navbar />
            <div className='text-center p-5'>
                <img src='sejaBemVindo.gif'/>
                <h2 className='purple'>Seja Bem vindo</h2>
                <br />
                <form >
                    <div className='border-purple p-5 m-2'>
                        <div className=''>
                        <label htmlFor="nome">Nome</label><br />
                        <input name='nome' type="text" /> <br /><br />

                        <label htmlFor="email">email</label><br />
                        <input name='email' type="text" /> <br /><br />

                        <label htmlFor="senha">senha</label><br />
                        <input name='senha' type="password" /> <br /><br />

                        <label htmlFor="papel">papel</label><br />
                        <select name="papel" id="">
                            <option value="0">Usuario</option>
                            <option value="1">Administrador</option>
                        </select>
                        <br /><br />
                        <button className='border-purple bg-transparent p-2 borer rounded'>entrar</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Registrar