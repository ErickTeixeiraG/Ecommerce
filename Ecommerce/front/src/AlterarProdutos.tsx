import { useEffect, useState } from "react";
import Produto from "./models/Produto";
import axios from "axios";
import { useParams } from "react-router-dom";

function AlterarProdutos() {
    const {id} = useParams();
    const [nome, setNome]= useState("");
    const [preco, setPreco]= useState(0);
    const [quantidade, setQuantidade]= useState(0);

    useEffect(() => {
        buscarProduto();
    }, []);

async function buscarProduto(){
        try {
            const resposta = await axios.get<Produto>(`http://localhost:5271/api/produto/buscar/${id}`)
            setNome(resposta.data.nome);
            setQuantidade(resposta.data.quantidade);
            setPreco(resposta.data.preco);
        } catch (error) {
            console.log(error);
        }
    }

    function enviarProduto(e:any){
        e.preventDefault();
        enviarProdutoApi();
    }

    async function enviarProdutoApi(){
        try{
            const produto : Produto = {
                nome, preco, quantidade
            };

            const resposta = await axios.patch(`http://localhost:5271/api/produto/alterar/${id}`, produto);
            console.log(resposta.data);
        }
        catch (error){
            console.log("Erro ao cadastrar o produto" + error)
        }
    }

    return(
        <div>
        <h1>Alterar Produto</h1>
            <form onSubmit={enviarProduto}>
                <div>
                    <label>Nome:</label>
                    <input onChange={(e:any) => setNome(e.target.value)} type="text" value={nome}/>
                </div>
                <div>
                    <label>Quantidade</label>
                    <input onChange={(e:any) => setQuantidade(e.target.value)} type="text" value={quantidade}/>
                </div>
                <div>
                    <label>Preço</label>
                    <input onChange={(e:any) => setPreco(e.target.value)} type="text" value={preco}/>
                </div>
                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    )
    
    
}


export default AlterarProdutos;