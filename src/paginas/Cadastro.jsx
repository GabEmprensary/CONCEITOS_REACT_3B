import { useState } from "react";

export default function Cadastro ({navegar}) {
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const cadastrar = async () => {
        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, nome, senha})
        });
        const data = await resposta.json()
        console.log(data);
        alert(data.message)      // 201: Usuário Criado! / 400: campos obrigatórios

        if (data.cadastro) {
            navegar('login')
        }
    }

    return (
        <div>
            <h1>CADASTRO</h1>

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
            <input type="password" id="senha"
            placeholder="DIGITE A SENHA"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            />

            <br />
            <br />

            <button onClick={() => cadastrar()}>Cadastrar</button>
            <button onClick={() => navegar('login')}>ja tenho cadastro</button>
        </div>
    )
}
