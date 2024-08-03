import React from "react";
import { Box, VStack, Text, Divider } from "@chakra-ui/react";
import CoffeeChoiceSection from "../shared_components/CoffeChoiceSelection/CoffeeChoiceSelection";
import { bgPrimaryColor, borderRadius } from "../../assets/theme";

const LeftSidebar = ({ userChoices, setUserChoices, isDisabled }) => {
  return (
    <Box
      position="relative"
      w={400}
      h="100%"
      bgColor={bgPrimaryColor}
      borderRadius={borderRadius}
      ml={4}
      justifyContent="space-between"
    >
      {isDisabled && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgColor="rgba(255, 255, 255, 0.6)"
          zIndex={2}
          cursor="not-allowed"
          pointerEvents="all"
          borderRadius={borderRadius}
        ></Box>
      )}
      <VStack spacing={4} align="stretch" p={4} pointerEvents={isDisabled ? "none" : "all"} h="80%">
        <CoffeeChoiceSection userChoices={userChoices} setUserChoices={setUserChoices} />
      </VStack>
      <Box p={4} borderTop="1px solid" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          User Choices
        </Text>
        {Object.keys(userChoices).map((key) => (
          <Box key={key} display="flex" justifyContent="space-between" mb={2}>
            <Text fontWeight="medium" color="gray.600">
              {key.replace(/_/g, " ")}:
            </Text>
            <Text fontWeight="bold" color="gray.800">
              {String(userChoices[key])}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftSidebar;
