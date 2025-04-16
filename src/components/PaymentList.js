/* eslint-disable react-hooks/exhaustive-deps */
// components/PaymentList.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PaymentItem from "./PaymentItem";

const API_BASE_URL = "http://localhost:8080/api/payments";

const ListContainer = styled.div`
  background: linear-gradient(135deg, #FFFFFF, #F3F6FF);
  padding: 30px;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color:rgb(0, 38, 255);
  margin-bottom: 20px;
`;

const ErrorMsg = styled.p`
  color: #D32F2F;
  font-weight: bold;
`;

function PaymentList({ userId, refresh }) {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  const fetchPayments = async () => {
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      setPayments(response.data);
    } catch (err) {
      console.error("Error fetching payments:", err.response?.data || err.message);
      setError("Error al consultar los pagos.");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userId, refresh]);

  return (
    <ListContainer>
      <Title>Historial de Pagos</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {payments.length === 0 ? (
        <p>No se encontraron pagos.</p>
      ) : (
        payments.map((payment) => (
          <PaymentItem key={payment.transactionId} payment={payment} />
        ))
      )}
    </ListContainer>
  );
}

export default PaymentList;
