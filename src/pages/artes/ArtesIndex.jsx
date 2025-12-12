import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Arte from '../../components/Arte';
import { Link } from 'react-router-dom';

const ArtesIndex = () => {
 const [artes, setArtes] = React.useState([]);

  //Crio o useEffecr (serve para fazer consulta em APIS)
  useEffect(() => {
    //Dentro do userEffect crio a função abaixo e declaro ela como async
    //declaramos ela como async pois iremos utilizar await dentro dela
    const fetchArtes = async () => {
      const response = await fetch("http://localhost:3000/api/artes")
      // console.log(response);
      const data = await response.json(); //converto os dados dentro de response para JSON
      // console.log(data);
      setArtes(data);
    }
    fetchArtes(); //chamando a função que foi declarada acima
  }, []);
  //[]significa que o useEffect vai rodar apenas 1 vez
  //depois do prinmeiro render

  return (
    <>
      <div>
        <Navbar />
        <div className="text-center">
        <img className="w-50 h-auto " src="/trabalhandoNisso.gif" alt="Imagem placeholder" />
        <h3 className="purple">Novas Informações aqui EM BREVE</h3>
        <p>caso queria ver mais coisas, va para o dashboard/<Link to="/dashboard/user">User</Link>/<Link to="/dashboard/admin">Admin</Link></p>

        </div>
      </div>
    </>
  )
}

export default ArtesIndex 