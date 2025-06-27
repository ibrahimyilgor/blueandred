export type PixelColor = "#0A84FF" | "#FF453A";

export interface PixelData {
  id: number;
  color: PixelColor;
}

export interface ColorStats {
  blue: number;
  red: number;
  timestamp: number;
}
