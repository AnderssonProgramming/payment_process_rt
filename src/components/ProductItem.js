import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const ProductName = styled.h3`
  margin: 0;
  color: #333;
`;

const ProductPrice = styled.p`
  color: #007700;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  color: #555;
`;

const Button = styled.button`
  background: ${(props) => props.bg || "#0077ff"};
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.hover || "#005fcc"};
  }
`;

const Input = styled.input`
  padding: 6px;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
`;

function ProductItem({ product, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.nombre);
  const [editedPrice, setEditedPrice] = useState(product.precio);
  const [editedDescription, setEditedDescription] = useState(product.descripcion);

  const API_URL = "http://localhost:8080/api/producto";

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/${product.idProducto}`)
      .then(() => {
        onDelete();
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
      });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .patch(`${API_URL}/${product.idProducto}`, {
        nombre: editedName,
        precio: editedPrice,
        descripcion: editedDescription,
      })
      .then(() => {
        setIsEditing(false);
        onUpdate(); // Actualiza la lista de productos en el padre
      })
      .catch((error) => {
        console.error("Error al actualizar producto:", error);
      });
  };

  return (
    <Card>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Nombre"
          />
          <Input
            type="number"
            step="0.01"
            value={editedPrice}
            onChange={(e) =>
              setEditedPrice(parseFloat(e.target.value) || 0)
            }
            placeholder="Precio"
          />
          <Input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Descripción"
          />
          <Button type="submit" bg="#28a745" hover="#218838">
            Guardar
          </Button>
          <Button type="button" onClick={handleEditToggle} bg="#6c757d" hover="#5a6268">
            Cancelar
          </Button>
        </form>
      ) : (
        <>
          <ProductName>{product.nombre}</ProductName>
          <ProductPrice>$ {product.precio.toFixed(2)}</ProductPrice>
          <ProductDescription>{product.descripcion}</ProductDescription>
          <Button onClick={handleEditToggle}>Editar</Button>
          <Button onClick={handleDelete} bg="#dc3545" hover="#c82333">
            Eliminar
          </Button>
        </>
      )}
    </Card>
  );
}

export default ProductItem;
