import { useEffect, useState } from "react";
import Produto from "./models/Produto";
import axios from "axios";
import { Link } from "react-router-dom";

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

function deletarProduto(id:string){
    deletarProdutoAPI(id);
}

async function deletarProdutoAPI(id:string){
    try {
        const resposta = await axios.delete(`http://localhost:5271/api/produto/deletar/${id}`);
        buscarProdutosAPI();
        console.log(resposta.data);
    } catch (error) {
        console.log(error)
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
                        <th>Deletar</th>
                        <th>Atualizar</th>
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
                            <td>
                                <button onClick={() => deletarProduto(produto.id!)}>Deletar</button>
                            </td>
                            <td>
                                <Link to={`/produto/alterar/${produto.id}`}>Alterar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListarProdutos;