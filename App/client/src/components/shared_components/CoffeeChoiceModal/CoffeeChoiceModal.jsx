import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Switch,
  VStack,
  Text,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";
import { coffeeOptions } from "../../../assets/user_choices";
import { coffeePrimaryColor, coffeeHoverColor } from "../../../assets/theme";
import coffeeTypeIcon from "../../../assets/icons/coffee_type.png";
import cupTypeIcon from "../../../assets/icons/cup_type.png";
import cappuccinoImage from "../../../assets/images/cappuccino.jpg";
import blackCoffeeImage from "../../../assets/images/black.webp";
import espressoImage from "../../../assets/images/espresso.jpg";

const CoffeeChoiceModal = ({
  isOpen,
  onClose,
  userChoices,
  setUserChoices,
  handleSubmit,
}) => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>What is your favorite coffee?</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH={"50vh"}>
          <VStack spacing={8} align="stretch">
            <FormControl>
              <FormLabel>
                <HStack>
                  <Image
                    src={coffeeTypeIcon}
                    boxSize="24px"
                    alt="Coffee Type Icon"
                  />
                  <Text>Coffee Type</Text>
                </HStack>
              </FormLabel>
              <HStack spacing={4} justify="center">
                {Object.keys(coffeeTypeImages).map((type) => (
                  <Box
                    key={type}
                    position="relative"
                    onClick={() => handleChange("coffee_type", type)}
                    cursor="pointer"
                    borderRadius="full"
                    overflow="hidden"
                    boxSize="120px"
                    borderWidth={userChoices.coffee_type === type ? "5px" : "0px"}
                    borderColor={userChoices.coffee_type === type ? coffeePrimaryColor : "transparent"}
                    transition="border-color 0.3s"
                  >
                    <Center boxSize="100%">
                      <Image
                        src={coffeeTypeImages[type]}
                        alt={type}
                        boxSize="100%"
                        objectFit="cover"
                        filter={userChoices.coffee_type === type ? "none" : "grayscale(80%)"}
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
                        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.100)"
                        color="white"
                        py={1}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Box>
                    </Center>
                  </Box>
                ))}
              </HStack>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <HStack spacing={4}>
                <Image src={cupTypeIcon} boxSize="24px" alt="Cup Type Icon" />
                <FormLabel mb="0">Take-Away</FormLabel>
                <Switch
                  isChecked={!userChoices.type_of_cup}
                  onChange={(e) =>
                    handleChange("type_of_cup", !e.target.checked)
                  }
                />
              </HStack>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={coffeePrimaryColor}
            color="white"
            _hover={{ bg: coffeeHoverColor }}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CoffeeChoiceModal;
