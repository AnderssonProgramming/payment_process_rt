import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  color: #555;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background: #0077ff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #005fcc;
  }
`;

function ProductForm({ onProductAdded }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const API_URL = "http://localhost:8080/api/producto";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!nombre || !precio) {
      alert("Por favor ingrese nombre y precio.");
      return;
    }

    axios
      .post(API_URL, {
        nombre,
        precio: parseFloat(precio),
        descripcion,
      })
      .then(() => {
        setNombre("");
        setPrecio("");
        setDescripcion("");
        onProductAdded();
      })
      .catch((error) => {
        console.error("Error al crear producto:", error);
      });
  };

  return (
    <FormContainer>
      <FormTitle>Agregar Nuevo Producto</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre</Label>
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <Input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripción</Label>
          <Input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Agregar Producto</Button>
      </form>
    </FormContainer>
  );
}

export default ProductForm;
