import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f7f7f7;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

function App() {
  const [refresh, setRefresh] = useState(false);

  // La función refreshProducts se utiliza para actualizar la lista de productos tras agregar o eliminar
  const refreshProducts = () => setRefresh(!refresh);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>Gestión de Productos</Header>
        <ProductForm onProductAdded={refreshProducts} />
        <ProductList refresh={refresh} onProductDeleted={refreshProducts} />
      </Container>
    </>
  );
}

export default App;
