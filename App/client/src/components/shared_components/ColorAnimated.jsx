import React from "react";
import { Text } from "@chakra-ui/react";
import "@fontsource/dm-serif-display";
import '@fontsource-variable/plus-jakarta-sans';
import styled, { keyframes } from "styled-components";

const colorTransition = (colors) => keyframes`
  ${colors.map((color, index) => `
    ${(index / colors.length) * 100}% {
      color: ${color};
    }
  `).join('\n')}
  100% {
    color: ${colors[0]};
  }
`;

const AnimatedText = styled.span`
  animation: ${props => colorTransition(props.colors)} ${props => props.colors.length * 3}s linear infinite;
`;

const ColorAnimated = ({ text, colors, size, fontFamily,fontWeight }) => {
  return (
    <Text fontSize={size} fontWeight={fontWeight} mb={2} fontFamily={fontFamily}>
      <AnimatedText colors={colors}>
        {text}
      </AnimatedText>
    </Text>
  );
};

export default ColorAnimated;