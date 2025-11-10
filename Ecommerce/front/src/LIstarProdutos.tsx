import { useEffect, useState } from "react";
import Produto from "./models/Produto";
import axios from "axios";

function ListarProdutos(){

    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        
        buscarProdutosAPI();

    }, []);

async function buscarProdutosAPI(){

    try {
        const resposta = await axios.get("http://localhost:5271/api/produto/listar");
        const dados = resposta.data;
        setProdutos(dados);
    } catch (error) {
        console.log("Requisição com erro: "+ error);
    }

    
}

    return(
        <div id="listar_produtos">
            <h1>Listar produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.criadoEm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListarProdutos;