import styled from "styled-components";
import { motion } from "framer-motion";

// Layout Components
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// Grid Components
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 8px);
  grid-auto-rows: 8px;
  gap: 1px;
  padding: 20px;
  height: 60vh;
  width: 100%;

  @media (min-width: 768px) {
    height: 100vh;
    width: 70%;
  }
`;

export const Pixel = styled(motion.div)<{ $color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$color};
  border-radius: 2px;
`;

// Stats Panel Components
export const StatsContainer = styled.div`
  width: 100%;
  padding: 24px;
  background-color: #1c1c1e;
  flex-direction: column;
  gap: 24px;
  border-left: 1px solid #2c2c2e;
  overflow-y: auto;

  @media (min-width: 1500px) {
    width: 30%;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1c1c1e;
  }

  &::-webkit-scrollbar-thumb {
    background: #3c3c3e;
    border-radius: 4px;
  }
`;

export const ChartTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 16px;
  color: #e5e5e7;
  font-weight: 500;
  letter-spacing: -0.5px;

  @media (min-width: 1500px) {
    font-size: 18px;
  }
`;

export const ChartContainer = styled.div`
  height: 225px;
  background-color: #2c2c2e;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid #3c3c3e;
  margin-bottom: 32px;

  @media (min-width: 1500px) {
    height: 275px;
  }
`;

export const InteractiveChartContainer = styled(ChartContainer)`
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Control Panel Components
export const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background-color: #2c2c2e;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #3c3c3e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #e5e5e7;
  font-size: 14px;
  font-weight: 500;
`;

export const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: #3c3c3e;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #0a84ff;
    cursor: pointer;
    transition: transform 0.1s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
`;

export const Value = styled.div`
  color: #0a84ff;
  font-size: 12px;
  font-weight: 500;
  text-align: right;
`;
