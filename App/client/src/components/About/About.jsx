import React from "react";
import {
  Box,
  Flex,
  VStack,
  Container,
  Image,
  SimpleGrid,
    Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import coffeeLottie from "../../assets/lottie/coffeeLottie.json";
import coffeeTypeIcon from "../../assets/icons/coffee_type.png";
import cremaIcon from "../../assets/icons/crema.png";
import servedWayIcon from "../../assets/icons/served_way.png";
import cupTypeIcon from "../../assets/icons/cup_type.png";

import coffeeType from "../../assets/images/type.jpeg";
import crema from "../../assets/images/crema.webp";
import servedWay from "../../assets/images/served_way.webp";
import cupType from "../../assets/images/cup_type.webp";
import ColorAnimated from "../shared_components/ColorAnimated";

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

const cardsData = [
  {
    image: coffeeType,
    icon: coffeeTypeIcon,
    title: "Coffee Type",
    description: "Identify the type of coffee beans or blend used.",
  },
  {
    image: crema,
    icon: cremaIcon,
    title: "Crema",
    description: "Analyze the quality and characteristics of the crema.",
  },
  {
    image: servedWay,
    icon: servedWayIcon,
    title: "Served Way",
    description: "Determine how the coffee is served (e.g., espresso, latte).",
  },
  {
    image: cupType,
    icon: cupTypeIcon,
    title: "Type of Cup",
    description:
      "Identify the type of cup or glass in which the coffee is served.",
  },
];

const InfoCard = ({ image, icon, title, description }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <MotionVStack
      align="center"
      bg={bgColor}
      borderRadius="md"
      p={0}
      boxShadow="md"
      position="relative"
      overflow="hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
    >
      <Image src={image} alt={title} objectFit="cover" w="full" h="150px" />
      <Box
        position="absolute"
        bottom="0"
        w="full"
        h="150px"
        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.400)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        color="white"
      >
        <VStack spacing={2} align="center">
          <Image
            src={icon}
            alt={`${title} Icon`}
            boxSize="40px"
            filter="invert(1)"
          />
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text textAlign="center">{description}</Text>
        </VStack>
      </Box>
    </MotionVStack>
  );
};

const About = () => {
  const titlesObj = {
    about: {
      colors: ["#4B2E1A", "#8B4513"],
      fontSize: "6xl",
      fontFamily: "DM Serif Display",
      fontWeight: "bold",
    },
    description: {
      colors: ["#6F3D12", "#CFAE7D"],
      fontSize: "xl",
      fontFamily: "Plus Jakarta Sans Variable",
      fontWeight: "100",
    },
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} spacing={8}>
        <VStack align="start" spacing={6} w={{ base: "100%", md: "50%" }}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ColorAnimated
              text="About CoffeeML"
              colors={titlesObj.about.colors}
              size={titlesObj.about.fontSize}
              fontFamily={titlesObj.about.fontFamily}
              fontWeight={titlesObj.about.fontWeight}
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ColorAnimated
              text="CoffeeML is a final project in our course. It involves creating a machine learning model that analyzes coffee images and provides detailed information about:"
              colors={titlesObj.description.colors}
              size={titlesObj.description.fontSize}
              fontFamily={titlesObj.description.fontFamily}
              fontWeight={titlesObj.description.fontWeight}
            />
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={8} w="full">
            {cardsData.map((card, index) => (
              <InfoCard
                key={index}
                image={card.image}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </SimpleGrid>
        </VStack>

        <Box
          w={{ base: "100%", md: "50%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Lottie animationData={coffeeLottie} loop={true} />
          </MotionBox>
        </Box>
      </Flex>
    </Container>
  );
};

export default About;
