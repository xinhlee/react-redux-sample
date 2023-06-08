import React from "react";

import Navbar from "./Components/Global/Navbar";

import Canvas from "./Components/Workarea/Canvas";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <Navbar></Navbar>
      <Canvas></Canvas>
    </Container>
  );
}

export default App;
