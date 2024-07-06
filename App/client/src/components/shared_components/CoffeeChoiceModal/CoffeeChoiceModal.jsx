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
} from "@chakra-ui/react";
import { coffeeOptions } from "../../../assets/user_choices";
import { coffeePrimaryColor, coffeeHoverColor } from "../../../assets/theme";
import coffeeTypeIcon from "../../../assets/icons/coffee_type.png";
import cupTypeIcon from "../../../assets/icons/cup_type.png";
// import cappuccinoImage from "../../../assets/images/cappuccino.png";
// import blackCoffeeImage from "../../../assets/images/black_coffee.png";
// import espressoImage from "../../../assets/images/espresso.png";

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
    cappuccino: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr",
    black: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr",
    espresso: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr"
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
              <HStack spacing={4}>
                {Object.keys(coffeeTypeImages).map((type) => (
                  <Box
                    key={type}
                    position="relative"
                    onClick={() => handleChange("coffee_type", type)}
                    cursor="pointer"
                    borderRadius="full"
                    overflow="hidden"
                    boxSize="100px"
                    borderWidth={userChoices.coffee_type === type ? "2px" : "0px"}
                    borderColor={userChoices.coffee_type === type ? coffeePrimaryColor : "transparent"}
                  >
                    <Image
                      src={coffeeTypeImages[type]}
                      alt={type}
                      filter={userChoices.coffee_type === type ? "none" : "grayscale(100%)"}
                      transition="filter 0.3s, border-color 0.3s"
                    />
                    <Box
                      position="absolute"
                      bottom="0"
                      width="100%"
                      textAlign="center"
                      bgGradient="linear(to-t, blackAlpha.800, transparent)"
                      color="white"
                      py={1}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Box>
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
