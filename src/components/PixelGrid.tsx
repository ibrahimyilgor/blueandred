import styled from "styled-components";
import { motion } from "framer-motion";
import { PixelData } from "../types";

interface PixelGridProps {
  pixels: PixelData[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 8px);
  grid-auto-rows: 8px;
  gap: 1px;
  padding: 20px;
  width: 100%;

  @media (min-width: 1500px) {
    height: 100vh;
    width: 70%;
  }
`;

const Pixel = styled(motion.div)<{ $color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$color};
  border-radius: 2px;
`;

export const PixelGrid: React.FC<PixelGridProps> = ({ pixels }) => {
  return (
    <Grid>
      {pixels.map((pixel) => (
        <Pixel
          key={pixel.id}
          $color={pixel.color}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          style={{
            backgroundColor: pixel.color,
          }}
          transition={{
            duration: 0.3,
            backgroundColor: { duration: 0.5 },
          }}
        />
      ))}
    </Grid>
  );
};
