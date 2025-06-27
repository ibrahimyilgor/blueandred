import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ColorStats } from "../types";

const StatsContainer = styled.div`
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

const ChartTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 16px;
  color: #e5e5e7;
  font-weight: 500;
  letter-spacing: -0.5px;

  @media (min-width: 1500px) {
    font-size: 18px;
  }
`;

const ChartContainer = styled.div`
  height: 225px;
  background-color: #2c2c2e;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid #3c3c3e;
  transition: transform 0.2s ease-in-out;
  margin-bottom: 32px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 1500px) {
    height: 275px;
  }
`;

const ControlPanel = styled.div`
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

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #e5e5e7;
  font-size: 14px;
  font-weight: 500;
`;

const Slider = styled.input`
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

const Value = styled.div`
  color: #0a84ff;
  font-size: 12px;
  font-weight: 500;
  text-align: right;
`;

interface StatsAnalysisProps {
  stats: ColorStats[];
  totalPixels: number;
  updateInterval: number;
  onTotalPixelsChange: (value: number) => void;
  onIntervalChange: (value: number) => void;
}

export const StatsAnalysis: React.FC<StatsAnalysisProps> = ({
  stats,
  totalPixels,
  updateInterval,
  onTotalPixelsChange,
  onIntervalChange,
}) => {
  const currentStats = stats[stats.length - 1] || { blue: 0, red: 0 };

  const pieData = [
    { id: "#0A84FF", label: "Blue", value: currentStats.blue },
    { id: "#FF453A", label: "Red", value: currentStats.red },
  ];

  const lineData = [
    {
      id: "blue",
      data: stats.map((stat, i) => ({
        x: i,
        y: stat.blue,
      })),
    },
    {
      id: "red",
      data: stats.map((stat, i) => ({
        x: i,
        y: stat.red,
      })),
    },
  ];

  return (
    <StatsContainer>
      <ControlPanel>
        <ControlGroup>
          <Label htmlFor="total-pixels">Total Pixels</Label>
          <Slider
            id="total-pixels"
            type="range"
            min="1"
            max="10000"
            step="1"
            value={totalPixels}
            onChange={(e) => onTotalPixelsChange(Number(e.target.value))}
          />
          <Value>{totalPixels}</Value>
        </ControlGroup>
        <ControlGroup>
          <Label htmlFor="update-interval">Update Interval (ms)</Label>
          <Slider
            id="update-interval"
            type="range"
            min="1"
            max="10000"
            step="1"
            value={updateInterval}
            onChange={(e) => onIntervalChange(Number(e.target.value))}
          />
          <Value>{updateInterval}</Value>
        </ControlGroup>
      </ControlPanel>
      <ChartTitle>Current Distribution</ChartTitle>
      <ChartContainer>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={6}
          colors={["#0A84FF", "#FF453A"]}
          borderWidth={0}
          enableArcLinkLabels={false}
          arcLabelsTextColor="#ffffff"
          arcLabel={(d) => `${d.value}`}
          arcLabelsSkipAngle={10}
          isInteractive={false}
          animate={true}
          theme={{
            text: { fill: "#e5e5e7" },
            labels: { text: { fill: "#e5e5e7" } },
          }}
        />
      </ChartContainer>

      <ChartTitle>Historical Trend</ChartTitle>
      <ChartContainer>
        <ResponsiveLine
          data={lineData}
          margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          curve="monotoneX"
          enablePoints={false}
          enableGridX={false}
          colors={["#0A84FF", "#FF453A"]}
          animate={true}
          theme={{
            text: { fill: "#e5e5e7" },
            grid: { line: { stroke: "#3c3c3e" } },
            axis: {
              ticks: { text: { fill: "#e5e5e7" } },
              domain: { line: { stroke: "#3c3c3e" } },
            },
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 35,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            legendPosition: "middle",
          }}
        />
      </ChartContainer>
    </StatsContainer>
  );
};
