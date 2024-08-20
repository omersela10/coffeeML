import React, { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Image,
  Text,
  Icon,
  Badge,
  HStack,
  VStack,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { FaStar, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { MdVerified, MdClose } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";

const CoffeeShopDisplay = ({ shop }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState(
    Array(shop.images.length).fill(true)
  );

  const getPriceLevel = (level) => {
    return "₪".repeat(level);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  const handleImageLoad = (index) => {
    setLoadingImages((prevLoadingImages) => {
      const newLoadingImages = [...prevLoadingImages];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };

  return (
    <Container maxW="container.xl" mt={4}>
      <Flex direction="column" height="80vh">
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          {shop.name}
        </Text>

        <HStack spacing={2} mb={4}>
          <Badge colorScheme="green">{shop.business_status}</Badge>
          <HStack>
            <Icon as={FaStar} color="yellow.400" />
            <Text>{shop.rating}</Text>
          </HStack>
          <Text>({shop.user_ratings_total} reviews)</Text>
        </HStack>

        <VStack align="start" spacing={2} mb={4}>
          <HStack>
            <Icon as={FaMapMarkerAlt} />
            <Text>{shop.vicinity}</Text>
          </HStack>
        </VStack>

        <HStack spacing={4} mb={4}>
          <VStack align="start" spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Details
            </Text>
            <HStack>
              <Icon as={FaStore} />
              <Text>Price Level: {getPriceLevel(shop.price_level)}</Text>
            </HStack>
            <HStack>
              <Text>Types: </Text>
              <HStack>
                {shop.types.map((type) => (
                  <Badge key={type} colorScheme="blue">
                    {type}
                  </Badge>
                ))}
              </HStack>
            </HStack>
            <HStack>
              <Text>Quality: </Text>
              <Badge colorScheme="purple">{shop.quality + 2}</Badge>
            </HStack>
            <HStack>
              <Text>Matches your choice: </Text>
              <Badge colorScheme={shop.is_matched ? "green" : "red"}>
                {shop.is_matched ? "Matched" : "Not Matched"}
              </Badge>
            </HStack>
          </VStack>
        </HStack>

        <Box>
          <Text fontSize="md" color="gray.600" mb={2}>
            Images:
          </Text>
          <Box overflowX="auto" maxH="300px">
            <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={2}>
              {shop.images.map((image, index) => (
                <Box
                  key={index}
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                  onClick={() => handleImageClick(image)}
                  cursor="pointer"
                  boxSize="150px"
                >
                  {loadingImages[index] && <Skeleton boxSize="150px" />}
                  <Image
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    objectFit="cover"
                    boxSize="150px"
                    onLoad={() => handleImageLoad(index)}
                    display={loadingImages[index] ? "none" : "block"}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    width="100%"
                    bg="rgba(0, 0, 0, 0.6)"
                    color="white"
                    textAlign="center"
                    py={1}
                  >
                    <HStack justify="space-between" px={2}>
                      <Text fontSize="sm" display="flex" alignItems="center">
                        <Icon as={BsFillStarFill} color="yellow.400" mr={2} />
                        {image.quality + 2}
                      </Text>
                      <Icon
                        as={image.is_matched ? MdVerified : MdClose}
                        color={image.is_matched ? "green.400" : "red.400"}
                      />
                    </HStack>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{shop.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedImage && (
                <Image src={selectedImage.url} alt="Selected Image" />
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Container>
  );
};

export default CoffeeShopDisplay;
