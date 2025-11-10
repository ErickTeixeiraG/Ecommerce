import React from 'react';
import ListarProdutos from './LIstarProdutos';
import CadastrarProdutos from './CadastrarProdutos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Listar Produtos</Link>
            </li>
            <li>
            <Link to="/produto/cadastrar">Cadastrar Produtos</Link>
            </li>
          </ul>
        </nav>
        <div id="conteudo">
          <Routes>
            <Route path="/" element={<ListarProdutos/>}></Route>
            <Route path="/produto/cadastrar" element={<CadastrarProdutos/>}></Route>
          </Routes>
        </div>
        <footer>

        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
