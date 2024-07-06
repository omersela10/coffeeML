import React from "react";
import { Box, Button, Divider, VStack } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { PiCoffeeFill } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";

import {
  activeLeftButton,
  bgPrimaryColor,
  borderRadius,
  coffeePrimaryColor,
  coffeeSecondaryColor,
  coffeeHoverColor,
} from "../../assets/theme";

const buttonConfigs = [
  {
    icon: <BsFillImageFill />,
    label: "Image",
    component: "byImage",
  },
  {
    icon: <PiCoffeeFill />,
    label: "Coffee Shop",
    component: "2",
  },
  {
    icon: <FaMapLocationDot />,
    label: "Location",
    component: "3",
  },
];

const LeftSidebar = ({ activeComponent, setActiveComponent }) => {
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <Box
      w={300}
      bgColor={bgPrimaryColor}
      h="100%"
      borderRadius={borderRadius}
      ml={4}
    >
      <VStack spacing={4} align="stretch" p={4}>
        {buttonConfigs.map((btn) => (
          <Button
            key={btn.component}
            leftIcon={btn.icon}
            variant={activeComponent === btn.component ? "solid" : "outline"}
            colorScheme={activeComponent === btn.component ? coffeePrimaryColor : coffeeSecondaryColor}
            bg={activeComponent === btn.component ? activeLeftButton : coffeeSecondaryColor}
            _hover={{ bg: coffeeHoverColor, color: "white" }}
            justifyContent={"flex-start"}
            onClick={() => handleComponentChange(btn.component)}
            border={"none"}
          >
            <Divider h={"20px"} mr={2} orientation="vertical" />
            {btn.label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default LeftSidebar;
