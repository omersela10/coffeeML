import React from "react";
import { Box } from "@chakra-ui/react";
import ColorAnimated from "../../shared_components/ColorAnimated";

const WelcomeText = ({ heading, subheading }) => {
  const titlesObj = {
    coffee: {
      colors: ["#4B2E1A", "#8B4513"],
      fontSize: "6xl",
      fontFamily: "DM Serif Display",
      fontWeight: "bold",
    },
    description: {
      colors: ["#8B4513", "#E1B88B"],
      fontSize: "xl",
      fontFamily: "Plus Jakarta Sans Variable",
      fontWeight: "100",
    },
  };
  return (
    <Box maxWidth="80%" mx="auto" textAlign="center">
      <ColorAnimated
        text={heading}
        colors={titlesObj.coffee.colors}
        size={titlesObj.coffee.fontSize}
        fontFamily={titlesObj.coffee.fontFamily}
        fontWeight={titlesObj.coffee.fontWeight}
      />
      <Box mt={2}>
        <ColorAnimated
          text={subheading}
          colors={titlesObj.description.colors}
          size={titlesObj.description.fontSize}
          fontFamily={titlesObj.description.fontFamily}
          fontWeight={titlesObj.description.fontWeight}
        />
      </Box>
    </Box>
  );
};

export default WelcomeText;
