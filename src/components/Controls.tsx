import React from "react";
import { CONTROL_RANGES } from "../constants";
import {
  ControlPanel,
  ControlGroup,
  Label,
  Slider,
  Value,
} from "../styles/StyledComponents";

interface ControlsProps {
  totalPixels: number;
  updateInterval: number;
  onTotalPixelsChange: (value: number) => void;
  onIntervalChange: (value: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  totalPixels,
  updateInterval,
  onTotalPixelsChange,
  onIntervalChange,
}) => {
  return (
    <ControlPanel>
      <ControlGroup>
        <Label htmlFor="total-pixels">Total Pixels</Label>
        <Slider
          id="total-pixels"
          type="range"
          min={CONTROL_RANGES.PIXELS.MIN}
          max={CONTROL_RANGES.PIXELS.MAX}
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
          min={CONTROL_RANGES.INTERVAL.MIN}
          max={CONTROL_RANGES.INTERVAL.MAX}
          step="1"
          value={updateInterval}
          onChange={(e) => onIntervalChange(Number(e.target.value))}
        />
        <Value>{updateInterval}</Value>
      </ControlGroup>
    </ControlPanel>
  );
};
