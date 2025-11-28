import React from 'react'
import Navbar from '../components/Navbar'


const Login = () => {
    return (
        <>
            <Navbar />
            <div className='text-center p-5'>
                <h2 className='purple'>Bem vindo de volta</h2>
                <br />
                <form >
                    <div className='border-purple p-5 m-2'>
                        <div className=''>
                        <label htmlFor="email">email</label><br />
                        <input name='email' type="text" /> <br /><br />

                        <label htmlFor="senha">senha</label><br />
                        <input name='senha' type="password" /> <br /><br />

                        <br /><br />
                        <button className='border-purple bg-transparent p-2 borer rounded'>entrar</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Login