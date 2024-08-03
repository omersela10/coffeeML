import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Switch,
  VStack,
  Text,
  Center,
  Divider,
} from "@chakra-ui/react";
import { coffeePrimaryColor } from "../../../assets/theme";
import coffeeTypeIcon from "../../../assets/icons/coffee_type.png";
import cupTypeIcon from "../../../assets/icons/cup_type.png";
import cappuccinoImage from "../../../assets/images/cappuccino.jpg";
import blackCoffeeImage from "../../../assets/images/black.webp";
import espressoImage from "../../../assets/images/espresso.jpg";
import CoffeeSwitch from "../CoffeeSwitch/CoffeeSwitch";

const CoffeeChoiceSection = ({ userChoices, setUserChoices }) => {
  const handleChange = (key, value) => {
    setUserChoices((prevChoices) => ({
      ...prevChoices,
      [key]: value,
    }));
  };

  const coffeeTypeImages = {
    cappuccino: cappuccinoImage,
    espresso: espressoImage,
    black: blackCoffeeImage,
  };

  return (
    <Box>
      <VStack spacing={12} align="stretch" justify="center">
        <FormControl>
          <FormLabel>
            <HStack display="flex" alignItems="center" justify="center">
              <Image
                src={coffeeTypeIcon}
                boxSize="24px"
                alt="Coffee Type Icon"
              />
              <Text fontWeight={"bold"}>Coffee Type</Text>
            </HStack>
            <Divider m={2} borderColor={coffeePrimaryColor} />
          </FormLabel>
          <HStack spacing={6} justify="space-evenly">
            {Object.keys(coffeeTypeImages).map((type) => (
              <Box
                key={type}
                position="relative"
                onClick={() => handleChange("coffee_type", type)}
                cursor="pointer"
                borderRadius="50%"
                overflow="hidden"
                boxSize="100px"
                borderWidth={userChoices.coffee_type === type ? "5px" : "0px"}
                borderColor={
                  userChoices.coffee_type === type
                    ? coffeePrimaryColor
                    : "transparent"
                }
                transition="border-color 0.3s"
              >
                <Center boxSize="100%">
                  <Image
                    src={coffeeTypeImages[type]}
                    alt={type}
                    boxSize="100%"
                    objectFit="cover"
                    _hover={{
                      filter: "none",
                    }}
                    filter={
                      userChoices.coffee_type === type
                        ? "none"
                        : "grayscale(80%)"
                    }
                    transition="filter 0.3s"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    width="100%"
                    height="100%"
                    textAlign="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgGradient="linear(to-t, blackAlpha.900, transparent)"
                  />
                </Center>
              </Box>
            ))}
          </HStack>
          <HStack spacing={6} justify="space-evenly">
            {Object.keys(coffeeTypeImages).map((type) => (
              <Text
                key={`${type}-label`}
                textAlign="center"
                fontWeight={
                  userChoices.coffee_type === type ? "bold" : "normal"
                }
                width="100px"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            ))}
          </HStack>
        </FormControl>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={"column"}
          w="100%"
        >
          <HStack
            spacing={4}
            justify="center"
            align="center"
            display="flex"
            w={"100%"}
          >
            <Image src={cupTypeIcon} boxSize="24px" alt="Cup Type Icon" />
            <FormLabel mb="0" fontWeight={"bold"}>
              Cup Type
            </FormLabel>
          </HStack>
          <Divider m={2} borderColor={coffeePrimaryColor} />
          {/* <Switch
            isChecked={!userChoices.type_of_cup}
            onChange={(e) => handleChange("type_of_cup", !e.target.checked)}
          /> */}
          <CoffeeSwitch
            isChecked={!userChoices.type_of_cup}
            onChange={(e) => handleChange("type_of_cup", !e.target.checked)}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default CoffeeChoiceSection;
