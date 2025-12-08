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
        <h3>ArtesIndex</h3>
       
        <center><img className="w-50 h-auto " src="/W_arts.gif" alt="Imagem placeholder" /></center>
        <Link to="/artes/create" className='btn btn-primary'>Criar</Link>
        <div className="row m-0">
        {artes.map(arte => <Arte key={arte.id} arte={arte} />)}
        </div>
      </div>
    </>
  )
}

export default ArtesIndex