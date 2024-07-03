import React from "react";
import { Box, Text } from "@chakra-ui/react";

const TextCard = ({ imageUrl, text }) => {
  return (
    <Box
      position="relative"
      borderRadius="md"
      overflow="hidden"
      h="100px"
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgPosition="center"
      w="80%"
        margin="auto"
    >
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        h="100%"
        bgGradient="linear(to-t, blackAlpha.900, transparent)"
        display="flex"
        alignItems="flex-end"
        p={4}
      >
        <Text color="white" fontWeight="bold">
          {text}
        </Text>
      </Box>
    </Box>
  );
};

export default TextCard;
