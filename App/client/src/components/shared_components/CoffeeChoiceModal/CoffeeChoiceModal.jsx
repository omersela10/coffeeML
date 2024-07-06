// src/components/shared_components/CoffeeChoice/CoffeeChoiceModal.js

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
  Select,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Switch,
  VStack,
  Text,
} from "@chakra-ui/react";
import { coffeeOptions } from "../../../assets/user_choices";
import { coffeePrimaryColor, coffeeHoverColor } from "../../../assets/theme";
import coffeeTypeIcon from "../../../assets/icons/coffee_type.png";
import cupTypeIcon from "../../../assets/icons/cup_type.png";

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
              <Select
                value={userChoices.coffee_type}
                onChange={(e) => handleChange("coffee_type", e.target.value)}
              >
                {coffeeOptions.coffee_type.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl display="flex" alignItems="center">
              <HStack spacing={4}>
                <Image src={cremaIcon} boxSize="24px" alt="Crema Icon" />
                <FormLabel mb="0">Crema</FormLabel>
                <Switch 
                  isChecked={userChoices.crema} 
                  onChange={(e) => handleChange('crema', e.target.checked)} 
                />
              </HStack>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <HStack spacing={4}>
                <Image src={servedWayIcon} boxSize="24px" alt="Served Way Icon" />
                <FormLabel mb="0">Served Way</FormLabel>
                <Switch 
                  isChecked={userChoices.served_way} 
                  onChange={(e) => handleChange('served_way', e.target.checked)} 
                />
              </HStack>
            </FormControl>
*/}
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
