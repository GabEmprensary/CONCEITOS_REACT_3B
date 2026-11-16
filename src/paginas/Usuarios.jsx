import { useEffect } from "react"
import { useState } from "react"

export default function Usuarios ({navegar}) {
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [id, setId] = useState(0)
    const [usuarios, setUsuarios] = useState([])
    const [modal, setModal] = useState(false)

    // busca os usuários quando a tela abre
    useEffect(() => {
        document.title = 'Usuários'
        buscarUsuarios()
    }, [])

    const buscarUsuarios = async () => {
        const resposta = await fetch('http://localhost:3000/usuarios')
        const data = await resposta.json()
        setUsuarios(data);
        console.log(data);
    }

    // abre o modal com os dados do usuário escolhido
    const editar = (usuario) => {
        if (!usuario || !usuario.nome) {
            alert('erro ao buscar usuario')
            return
        }
        setModal(true)
        setEmail(usuario.email)
        setNome(usuario.nome)
        setSenha(usuario.senha)
        setId(usuario.id)
        console.log(usuario);
    }

    const confirmarEdicao = async () => {
        const resultado = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, nome, senha})
        })
        const data = await resultado.json()
        console.log(data);
        alert(data.message)

        if (resultado.status === 200) {
            setModal(false)
            buscarUsuarios()
        }
    }

    const deletar = async (usuario) => {
        if (!confirm(`Deseja excluir ${usuario.nome}?`)) {
            return
        }
        const resultado = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
            method: 'DELETE'
        })
        const data = await resultado.json()
        console.log(data);
        alert(data.message)
        buscarUsuarios()
    }

    return (
        <div>
            <h1>USUARIOS</h1>
            <button onClick={() => navegar('login')}>sair</button>

            {modal && (
                <div className="fundo-modal" >
                    <div className="modal-content">
                        <h1>Editar</h1>
                        <input type="text" id="email"
                        placeholder="DIGITE EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="text" id="nome"
                        placeholder="DIGITE NOME"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                        <input type="text" id="senha"
                        placeholder="DIGITE A SENHA"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        />
                        <br />
                        <br />
                        <button onClick={() => setModal(false)}>fechar</button>
                        <button onClick={confirmarEdicao}>Confirmar edição</button>
                    </div>
                </div>
            )}

            <ul>
                {usuarios.map( (usuario) => (
                    <li key={usuario.id}>
                        <b>{usuario.nome}</b>
                        <br />
                        EMAIL: {usuario.email}
                        <br />
                        STATUS: { usuario.ativo ? 'Ativo' : 'Desativo' }
                        <br />
                        <button onClick={() => editar(usuario)}>editar</button>
                        <button onClick={() => deletar(usuario)}>deletar</button>
                        <br />
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}
