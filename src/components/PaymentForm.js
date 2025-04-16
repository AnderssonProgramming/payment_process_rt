// components/PaymentForm.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/payments";

const FormContainer = styled.div`
  background: linear-gradient(135deg,rgba(231, 203, 141, 0.77),rgb(166, 224, 188));
  padding: 25px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0 12px 0;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color:rgb(7, 31, 255);
    box-shadow: 0 0 5px rgba(85,99,222,0.5);
  }
`;

const Button = styled.button`
  background: #5563DE;
  color: #fff;
  padding: 12px 20px;
  border: none;
  margin: 15px 5px 0 0;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background: #3e50b5;
    transform: translateY(-2px);
  }
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  color:rgb(0, 38, 255);
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
`;

function PaymentForm({ onPaymentCreated, setUserId }) {
  const [paymentData, setPaymentData] = useState({
    userId: "",
    items: [
      { productName: "", unitPrice: "", quantity: "", purchaseDate: "" },
    ],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = paymentData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setPaymentData({ ...paymentData, items: newItems });
  };

  const addItem = () => {
    setPaymentData({
      ...paymentData,
      items: [
        ...paymentData.items,
        { productName: "", unitPrice: "", quantity: "", purchaseDate: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!paymentData.userId) {
      setError("El campo usuario es obligatorio.");
      return;
    }
    // Actualizamos el userId para que el padre (App) lo conozca
    setUserId(paymentData.userId);
    try {
      const response = await axios.post(API_BASE_URL, paymentData);
      console.log("Payment successfully created:", response.data);
      // Notificamos al padre para actualizar el historial
      onPaymentCreated();
      // Reiniciamos el formulario: dejamos userId intacto para no tener que volver a escribirlo
      setPaymentData({
        userId: paymentData.userId,
        items: [{ productName: "", unitPrice: "", quantity: "", purchaseDate: "" }],
      });
    } catch (err) {
      console.error("Error creating payment:", err.response?.data || err.message);
      setError("Error al procesar el pago. Revisa los datos ingresados.");
    }
  };

  return (
    <FormContainer>
      <Title>Registrar Pago</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Label>Usuario (userId):</Label>
        <Input
          type="text"
          name="userId"
          value={paymentData.userId}
          onChange={handleChange}
          placeholder="Ingresa el identificador del usuario"
        />
        {paymentData.items.map((item, index) => (
          <ItemContainer key={index}>
            <h4>Artículo {index + 1}</h4>
            <Label>Producto:</Label>
            <Input
              type="text"
              name="productName"
              value={item.productName}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Nombre del producto"
              required
            />
            <Label>Precio Unitario:</Label>
            <Input
              type="number"
              step="0.01"
              name="unitPrice"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Precio unitario"
              required
            />
            <Label>Cantidad:</Label>
            <Input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Cantidad"
              required
            />
            <Label>Fecha de Compra (DD-MM-YYYY):</Label>
            <Input
              type="text"
              name="purchaseDate"
              value={item.purchaseDate}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="DD-MM-YYYY"
              required
            />
          </ItemContainer>
        ))}
        <Button type="button" onClick={addItem}>
          Agregar otro artículo
        </Button>
        <Button type="submit">Procesar Pago</Button>
      </form>
    </FormContainer>
  );
}

export default PaymentForm;
