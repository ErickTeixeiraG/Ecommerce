import { useState } from "react";

function CadastrarProduto() {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");

    async function cadastrarProdutoAPI() {

        const produto = {
            nome: nome,
            quantidade: parseInt(quantidade),
            preco: parseFloat(preco)
        };
}
}