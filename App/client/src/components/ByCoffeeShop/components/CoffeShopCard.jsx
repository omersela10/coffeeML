import React from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Icon,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const CoffeeShopCard = ({ shop, setSelectedShop, image }) => {
  const getStars = (quality) => {
    const validQuality = Math.min(Math.max(quality + 2, 1), 5); // Ensure quality is between 1 and 5
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          as={FaStar}
          color={i <= validQuality ? "yellow.300" : "gray.300"}
        />
      );
    }
    return stars;
  };

  return (
    <Box
      w="200px"
      h="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      position="relative"
      transform="scale(1)" // Ensure initial scale is set
      transition="transform 0.2s ease-in-out" // Set transition for scale
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.02)",
      }}
    >
      <Image
        src={
          image ||
          "https://www.creativefabrica.com/wp-content/uploads/2020/09/15/Coffee-Shop-Vector-Building-Illustration-Graphics-5493170-1-580x386.jpg"
        }
        alt={shop.name}
        h="100%"
        objectFit="cover"
        filter="brightness(0.75)"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-b, blackAlpha.700, blackAlpha.200, blackAlpha.900)"
        p="4"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack align="start">
          <HStack justifyContent="center" width="100%">
            <Badge
              colorScheme={shop.is_matched ? "green" : "red"}
              rounded="full"
              p=".2"
              fontWeight="light"
              variant="solid"
              size="sm"
            >
              {shop.is_matched ? "Matched" : "Not Matched"}
            </Badge>
          </HStack>
          <Text fontWeight="bold" fontSize="lg" color="yellow.50" noOfLines={1}>
            {shop.name}
          </Text>
          <HStack shadow="md">{getStars(shop.quality)}</HStack>
        </VStack>
        <Box>
          <Flex alignItems="center" mb={2}>
            <Icon as={FaMapMarkerAlt} mr={2} color="gray.200" />
            <Text fontSize="sm" color="gray.200">
              {shop.vicinity}
            </Text>
          </Flex>
          <Button
            onClick={() => setSelectedShop(shop)}
            variant="outline"
            borderColor="yellow.50"
            color="yellow.50"
            _hover={{
              color: "white",
              bg: "blackAlpha.400",
            }}
            rounded="full"
            px={6}
            py={3}
            fontSize="md"
            fontWeight="light"
            width="100%"
            rightIcon={<BiSolidCoffeeBean />}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CoffeeShopCard;
