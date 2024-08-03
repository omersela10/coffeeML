// CoffeeSwitch.jsx
import React from "react";
import { Box, Switch, Text } from "@chakra-ui/react";
import { FaCoffee } from "react-icons/fa";
import { TbCup } from "react-icons/tb";

const CoffeeSwitch = ({ isChecked, onChange }) => {
  const inactiveColor = "#d2b48c";
  const activeColor = "#6f4e37";
  const defaultTextColor = "yellow";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="300px"
    >
      <Text
        width="100px"
        textAlign="right"
        mr={2}
        textDecoration={!isChecked ? "underline" : "none"}
        color="#8B4513"
        fontFamily="Plus Jakarta Sans Variable"
        fontWeight="100"
      >
        Dine-In
      </Text>
      <Box
        position="relative"
        width="80px"
        height="40px"
        bg={isChecked ? activeColor : inactiveColor}
        borderRadius="full"
        padding="4px"
        transition="all 0.5s ease"
        _hover={{
          backgroundColor: isChecked ? "#5e3e2d" : "#c19a6b",
        }}
      >
        <Switch
          id="coffeeSwitch"
          isChecked={isChecked}
          onChange={onChange}
          size="lg"
          position="absolute"
          opacity="0"
          width="100%"
          height="100%"
          zIndex="2"
          cursor="pointer"
        />
        <Box
          position="absolute"
          left={isChecked ? "calc(100% - 36px)" : "4px"}
          top="4px"
          width="32px"
          height="32px"
          bg="white"
          borderRadius="full"
          transition="all 0.5s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            transform: "scale(1.1)",
          }}
        >
          {isChecked ? (
            <TbCup color={activeColor} size="18px" />
          ) : (
            <FaCoffee color={inactiveColor} size="18px" />
          )}
        </Box>
        <Box
          position="absolute"
          left={isChecked ? "8px" : "calc(100% - 32px)"}
          top="4px"
          opacity={0.3}
          transition="all 0.5s ease"
          _hover={{
            opacity: 0.5,
          }}
        >
          {isChecked ? (
            <FaCoffee color="white" size="28px" />
          ) : (
            <TbCup color="white" size="28px" />
          )}
        </Box>
      </Box>

      <Text
        width="100px"
        textAlign="left"
        ml={2}
        textDecoration={isChecked ? "underline" : "none"}
        color="#8B4513"
        fontFamily="Plus Jakarta Sans Variable"
        fontWeight="100"
      >
        Take-Away
      </Text>
    </Box>
  );
};

export default CoffeeSwitch;
