import { useState } from "react";
import Produto from "./models/Produto";
import axios from "axios";

function CadastrarProdutos() {
    const [nome, setNome]= useState("");
    const [preco, setPreco]= useState(0);
    const [quantidade, setQuantidade]= useState(0);

    function enviarProduto(e:any){
        e.preventDefault();
        enviarProdutoApi();
    }

    async function enviarProdutoApi(){
        try{
            const produto : Produto = {
                nome, preco, quantidade
            };

            const resposta = await axios.post("http://localhost:5271/api/produto/cadastrar", produto);
            console.log(resposta.data);
        }
        catch (error){
            console.log("Erro ao cadastrar o produto" + error)
        }
    }

    return(
        <div>
        <h1>Cadastrar Produto</h1>
            <form onSubmit={enviarProduto}>
                <div>
                    <label>Nome:</label>
                    <input onChange={(e:any) => setNome(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>Quantidade</label>
                    <input onChange={(e:any) => setQuantidade(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>Preço</label>
                    <input onChange={(e:any) => setPreco(e.target.value)} type="text"/>
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
    
    
}


export default CadastrarProdutos;