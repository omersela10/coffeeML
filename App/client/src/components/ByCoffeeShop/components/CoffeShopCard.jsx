import React from "react";
import { Box, Image, Text, Flex, Icon, Button } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidCoffeeBean } from "react-icons/bi";

const CoffeeShopCard = ({ shop, setSelectedShop, image }) => {
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
        filter="brightness(0.85)"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-b, blackAlpha.700, blackAlpha.100, blackAlpha.900)"
        p="4"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text
          fontWeight="bold"
          fontSize="lg"
          color="yellow.50"
          mb={1}
          noOfLines={1}
        >
          {shop.name}
        </Text>
        <Box>
          <Flex alignItems="center" mb={2}>
            <Icon as={FaMapMarkerAlt} mr={2} color="gray.200" />
            <Text fontSize="sm" color="gray.200">
              {shop.vicinity}
            </Text>
          </Flex>
          <Button
            onClick={() => setSelectedShop(shop)}
            variant={"outline"}
            borderColor="yellow.50"
            color="yellow.50"
            _hover={{
              color: "white",
              bg: "blackAlpha.400",
            }}
            rounded={"full"}
            px={6}
            py={3}
            fontSize={"md"}
            fontWeight={"light"}
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
