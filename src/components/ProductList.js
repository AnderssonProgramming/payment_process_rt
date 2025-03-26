import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProductItem from "./ProductItem";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ListTitle = styled.h2`
  color: #555;
`;

function ProductList({ refresh, onProductDeleted }) {
  const [products, setProducts] = useState([]);

  // URL del backend (ajusta el puerto o dominio según tu configuración)
  const API_URL = "http://localhost:8080/api/producto";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [refresh]);

  return (
    <ListContainer>
      <ListTitle>Lista de Productos</ListTitle>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.idProducto}
            product={product}
            onDelete={onProductDeleted}
            onUpdate={onProductDeleted}
          />
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </ListContainer>
  );
}

export default ProductList;
