import React from "react";
import { Box, Button, Divider, IconButton, VStack } from "@chakra-ui/react";

import {BsFillImageFill } from "react-icons/bs";
import { PiCoffeeFill } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";


import {
  activeLeftButton,
  bgPrimaryColor,
  borderRadius,
} from "../../assets/theme";

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
        <Button
          leftIcon={<BsFillImageFill />}
          variant={activeComponent === "1" ? "solid" : "outline"}
          colorScheme={activeComponent === "1" ? "blue" : "gray"}
          bg={activeComponent === "1" ? activeLeftButton : "gray.100"}
          _hover={{ bg: "gray.500" ,color:"white"}}
          justifyContent={"flex-start"}
          onClick={() => handleComponentChange("1")}
        >
          <Divider h={"20px"} mr={2} orientation="vertical" />
          Image
        </Button>
        <Button
          leftIcon={<PiCoffeeFill />}
          variant={activeComponent === "2" ? "solid" : "outline"}
          colorScheme={activeComponent === "2" ? "blue" : "gray"}
          bg={activeComponent === "2" ? activeLeftButton : "gray.100"}
          justifyContent={"flex-start"}
          _hover={{ bg: "gray.500" ,color:"white"}}
          onClick={() => handleComponentChange("2")}
        >
            <Divider h={"20px"} mr={2}  orientation='vertical'/>

          Coffe Shop
        </Button>
        <Button
          leftIcon={<FaMapLocationDot />}
          variant={activeComponent === "3" ? "solid" : "outline"}
          colorScheme={activeComponent === "3" ? "blue" : "gray"}
          bg={activeComponent === "3" ? activeLeftButton : "gray.100"}
          _hover={{ bg: "gray.500" ,color:"white"}}
          justifyContent={"flex-start"}
          onClick={() => handleComponentChange("3")}
        >
            <Divider h={"20px"} mr={2}  orientation='vertical'/>

          Location
        </Button>
      </VStack>
    </Box>
  );
};

export default LeftSidebar;
