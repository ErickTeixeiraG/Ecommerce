import { useEffect } from "react";

function ListarProdutos(){
    useEffect(() => {
        
        buscarProdutosAPI();

    }, []);

async function buscarProdutosAPI(){

    try {
        const resposta = await fetch("http://localhost:5271/api/produto/listar")
        if(!resposta.ok){
            throw new Error("Requisição com problema: "+ resposta.statusText);
        }
        const dados = await resposta.json();
        console.table(dados);
    } catch (error) {
        console.log("Requisição com erro: "+ error);
    }

    
}

    return(
        <div id="listar_produtos">
            <h1>Listar produtos</h1>
        </div>
        
    );
}
export default ListarProdutos;