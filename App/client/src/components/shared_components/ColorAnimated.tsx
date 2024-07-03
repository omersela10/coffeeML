import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import FancyText from "@carefully-coded/react-text-gradient";
import "@fontsource/dm-serif-display";

const ColorAnimated = ({ text }) => {
  const colors = ["#4B2E1A", "#8B4513"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animation = {
    from: colors[currentIndex],
    to: colors[(currentIndex + 1) % colors.length],
  };

  return (
    <Text fontSize="4xl" fontWeight="bold" mb={4} fontFamily="DM Serif Display">
      <FancyText
        gradient={{ from: animation.from, to: animation.to, type: "linear" }}
        animateTo={animation}
        animateDuration={600000}
      >
        {text}
      </FancyText>
    </Text>
  );
};

export default ColorAnimated;