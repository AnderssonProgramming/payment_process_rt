// components/PaymentItem.js
import React from "react";
import styled from "styled-components";

const PaymentCard = styled.div`
  background: #FFF;
  border: 2px solid #E3E9F3;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  transition: transform 0.2s ease;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.05);
  &:hover {
    transform: scale(1.02);
  }
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px dashed #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const PaymentTitle = styled.h4`
  color:rgb(8, 32, 243);
`;

const PaymentInfo = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  & strong {
    color: #333;
  }
`;

function PaymentItem({ payment }) {
  return (
    <PaymentCard>
      <PaymentTitle>Transacción: {payment.transactionId}</PaymentTitle>
      <PaymentInfo><strong>Usuario:</strong> {payment.userId}</PaymentInfo>
      <PaymentInfo>
        <strong>Monto Total:</strong> ${payment.totalAmount.toFixed(2)}
      </PaymentInfo>
      <PaymentInfo>
        <strong>Status:</strong> {payment.status}
      </PaymentInfo>
      {payment.errorMessage && (
        <PaymentInfo style={{ color: "#D32F2F" }}>
          <strong>Error:</strong> {payment.errorMessage}
        </PaymentInfo>
      )}
      <div>
        <h5 style={{ color: "#3E50B5" }}>Artículos:</h5>
        {payment.items.map((item, index) => (
          <ItemRow key={index}>
            <span>{item.productName} (x{item.quantity})</span>
            <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
          </ItemRow>
        ))}
      </div>
    </PaymentCard>
  );
}

export default PaymentItem;
