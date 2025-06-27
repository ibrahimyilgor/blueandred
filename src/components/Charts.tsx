import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ColorStats } from "../types";
import { COLORS, CHART_CONFIG } from "../constants";
import {
  ChartContainer,
  InteractiveChartContainer,
  ChartTitle,
} from "../styles/StyledComponents";

interface ChartProps {
  stats: ColorStats[];
}

export const DistributionChart: React.FC<ChartProps> = ({ stats }) => {
  const currentStats = stats[stats.length - 1] || { blue: 0, red: 0 };

  const pieData = [
    { id: COLORS.BLUE, label: "Blue", value: currentStats.blue },
    { id: COLORS.RED, label: "Red", value: currentStats.red },
  ];

  return (
    <>
      <ChartTitle>Current Distribution</ChartTitle>
      <ChartContainer>
        <ResponsivePie
          data={pieData}
          margin={CHART_CONFIG.PIE_MARGINS}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={6}
          colors={[COLORS.BLUE, COLORS.RED]}
          borderWidth={0}
          enableArcLinkLabels={false}
          arcLabelsTextColor={COLORS.TEXT}
          arcLabel={(d) => `${d.value}`}
          arcLabelsSkipAngle={10}
          isInteractive={false}
          animate={true}
          theme={{
            text: { fill: COLORS.TEXT },
            labels: { text: { fill: COLORS.TEXT } },
          }}
        />
      </ChartContainer>
    </>
  );
};

export const TrendChart: React.FC<ChartProps> = ({ stats }) => {
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
    <>
      <ChartTitle>Historical Trend</ChartTitle>
      <InteractiveChartContainer>
        <ResponsiveLine
          data={lineData}
          margin={CHART_CONFIG.LINE_MARGINS}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          curve="monotoneX"
          enablePoints={false}
          enableGridX={false}
          colors={[COLORS.BLUE, COLORS.RED]}
          animate={true}
          theme={{
            text: { fill: COLORS.TEXT },
            grid: { line: { stroke: COLORS.BORDER } },
            axis: {
              ticks: { text: { fill: COLORS.TEXT } },
              domain: { line: { stroke: COLORS.BORDER } },
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
            legend: "Count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
        />
      </InteractiveChartContainer>
    </>
  );
};
