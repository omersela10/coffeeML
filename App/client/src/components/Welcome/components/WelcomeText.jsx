import React from "react";
import {
  Box,
  Text,
  Button,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import ColorAnimated from "../../shared_components/ColorAnimated";
import TextCard from "./TextCard"; // Adjust the path as needed

const WelcomeText = ({ 
  heading, 
  description, 
  bulletPoints, 
  strongText, 
  buttonText, 
  handleButtonClick 
}) => {
  const images = [
    'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1309778/pexels-photo-1309778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  return (
    <Box maxWidth="80%" mx="auto" textAlign="center">
      <ColorAnimated text={heading} />
      {/* <Text mb={4} textAlign={{ base: "center", md: "center" }}>
        {description}
      </Text> */}
      <Divider mb={4} borderColor="yellow.600" />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        {bulletPoints.map((point, index) => (
          <TextCard key={index} imageUrl={images[index]} text={point} />
        ))}
      </SimpleGrid>
      <Divider mb={4} borderColor="yellow.600" />
      <Text mb={6} textAlign="center" color="yellow.600">
        <strong>{strongText}</strong>
      </Text>
      <Button
        rightIcon={<ChevronRightIcon />}
        fontFamily="DM Serif Display"
        variant="outline"
        size="lg"
        borderColor="yellow.600"
        color="yellow.600"
        _hover={{ bg: "yellow.600", color: "white" }}
        _active={{ bg: "yellow.600", color: "white" }}
        _focus={{ boxShadow: "none" }}
        rounded="full"
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default WelcomeText;
