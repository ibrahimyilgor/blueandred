import React, { useState } from "react";
import styled from "styled-components";
import { PixelGrid } from "./components/PixelGrid";
import { StatsAnalysis } from "./components/StatsAnalysis";
import { usePixelManager } from "./hooks/usePixelManager";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;

  @media (min-width: 1500px) {
    flex-direction: row;
  }
`;

function App() {
  const [totalPixels, setTotalPixels] = useState(500);
  const [updateInterval, setUpdateInterval] = useState(1000);

  const handleTotalPixelsChange = (value: number) => {
    setTotalPixels(value);
  };

  const handleIntervalChange = (value: number) => {
    setUpdateInterval(value);
  };

  const { pixels, stats } = usePixelManager(totalPixels, updateInterval);

  return (
    <AppContainer>
      <PixelGrid pixels={pixels} />
      <StatsAnalysis
        stats={stats}
        totalPixels={totalPixels}
        updateInterval={updateInterval}
        onTotalPixelsChange={handleTotalPixelsChange}
        onIntervalChange={handleIntervalChange}
      />
    </AppContainer>
  );
}

export default App;
