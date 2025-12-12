import React from 'react'
import { useParams } from 'react-router-dom'
import Arte from '../../components/Arte';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ArtesShow = () => {
  const params = useParams();
  const { id } = params;
  const [artes, setArtes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Carregar usuário e validar acesso
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("É preciso fazer login");
      navigate("/usuarios/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Bloqueia admins
    if (parsedUser.papel === 0) {
      alert("Acesso negado. Apenas usuários comuns.");
      navigate("/"); // redireciona para home ou outra página
      return;
    }
    setUser(parsedUser);

  }, [navigate]);

  // Carregar artes
  useEffect(() => {
    const fetchArtes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/artes/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar artes");
        const data = await response.json();
        setArtes(data);
      } catch (error) {
        console.error("Erro ao buscar artes:", error);
      }
    };

    fetchArtes();
  }, [id]);

  if (!user) return null; // evita render prematuro
  return (
    <>
      <Navbar />
      <div className='row'>
        <Arte key={artes.id} arte={artes} />
      </div>
    </>
  )
}

export default ArtesShow