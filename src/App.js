// App.js
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import PaymentForm from "./components/PaymentForm";
import PaymentList from "./components/PaymentList";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg,rgb(165, 226, 116),rgb(0, 24, 245));
    margin: 0;
    padding: 0;
    color: #333;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  color:rgb(0, 26, 255);
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const ToggleButton = styled.button`
  background: #0078d7;
  color: #fff;
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:hover {
    background: #005bb5;
    transform: translateY(-2px);
  }
`;

function App() {
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const refreshPayments = () => setRefresh(!refresh);
  const toggleHistory = () => setShowHistory(!showHistory);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>Gestión de Pagos</Header>
        <PaymentForm onPaymentCreated={refreshPayments} setUserId={setUserId} />
        
        {/* Botón para alternar el historial */}
        {userId && (
          <ToggleButton onClick={toggleHistory}>
            {showHistory ? "Ocultar Historial de Pagos" : "Ver Historial de Pagos"}
          </ToggleButton>
        )}

        {/* Mostrar el historial solo si se ha presionado el botón */}
        {showHistory && userId && (
          <PaymentList userId={userId} refresh={refresh} />
        )}
      </Container>
    </>
  );
}

export default App;
