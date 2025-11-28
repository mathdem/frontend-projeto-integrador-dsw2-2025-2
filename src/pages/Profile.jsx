import { useState, useContext } from "react";
import { AuthContext } from "../context/Context";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser, logout } = useContext(AuthContext);
  const [form, setForm] = useState(() => ({
    nome: user?.nome ?? "",
    email: user?.email ?? "",
    senha: ""
  }));
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Chama a rota PUT que criamos no passo 1
      const { data } = await api.put(`/usuarios/${user.id}`, form);
      setUser({ ...user, ...data }); // Atualiza contexto
      alert("Perfil atualizado!");
      setForm({ ...form, senha: "" }); // Limpa senha
    } catch (error) {
      alert("Erro ao atualizar: " + error.response?.data?.erro);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza? Esta ação é irreversível.")) {
      try {
        // Chama a rota DELETE que criamos no passo 1
        await api.delete(`/usuarios/${user.id}`);
        logout();
        alert("Conta excluída.");
        navigate("/");
      } catch (error) {
        alert("Erro ao excluir: " + error.response?.data?.erro);
      }
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Meu Perfil</h2>
      <p>Bem-vindo, {user.nome}</p>

      <form onSubmit={handleUpdate} style={{ border: "1px solid #ccc", padding: 15 }}>
        <h3>Editar Dados</h3>
        <label>Nome: </label>
        <input 
          value={form.nome} 
          onChange={e => setForm({...form, nome: e.target.value})} 
        />
        <br/><br/>
        <label>Email: </label>
        <input 
          type="email"
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
        />
        <br/><br/>
        <label>Nova Senha (deixe em branco para manter): </label>
        <input 
          type="password"
          value={form.senha} 
          onChange={e => setForm({...form, senha: e.target.value})} 
        />
        <br/><br/>
        <button type="submit">Salvar Alterações</button>
      </form>

      <br/>
      <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
        Excluir Minha Conta
      </button>
      <br/><br/>
      <button onClick={logout}>Sair (Logout)</button>
    </div>
  );
}