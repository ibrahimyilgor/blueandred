import { useState, useEffect, useCallback } from "react";
import { PixelColor, PixelData, ColorStats } from "../types";

export const usePixelManager = (
  totalPixels: number,
  updateInterval: number
) => {
  const [pixels, setPixels] = useState<PixelData[]>([]);
  const [stats, setStats] = useState<ColorStats[]>([]);

  // Update stats function
  const updateStats = useCallback((currentPixels: PixelData[]) => {
    const blueCount = currentPixels.filter((p) => p.color === "#0A84FF").length;
    const redCount = currentPixels.filter((p) => p.color === "#FF453A").length;

    setStats((prevStats) => {
      const newStat = {
        blue: blueCount,
        red: redCount,
        timestamp: Date.now(),
      };
      return [...prevStats.slice(-20), newStat]; // Keep last 20 records
    });
  }, []);

  // Initialize pixels
  useEffect(() => {
    const initialPixels = Array.from({ length: totalPixels }, (_, index) => ({
      id: index,
      color: Math.random() < 0.5 ? "#0A84FF" : ("#FF453A" as PixelColor),
    }));
    setPixels(initialPixels);
    updateStats(initialPixels);
  }, [totalPixels, updateStats]);

  // Update random pixels
  useEffect(() => {
    if (totalPixels === 0) return; // Guard against invalid pixel count

    const interval = setInterval(() => {
      setPixels((currentPixels) => {
        const newPixels = [...currentPixels];
        const pixelsToChange = totalPixels;
        const updates = new Set(); // Track indices to prevent duplicates

        while (updates.size < pixelsToChange) {
          const randomIndex = Math.floor(Math.random() * totalPixels);
          if (!updates.has(randomIndex)) {
            updates.add(randomIndex);
            newPixels[randomIndex] = {
              ...newPixels[randomIndex],
              color: Math.random() < 0.5 ? "#0A84FF" : "#FF453A",
            };
          }
        }

        updateStats(newPixels);
        return newPixels;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [totalPixels, updateInterval, updateStats]);
  return { pixels, stats };
};
