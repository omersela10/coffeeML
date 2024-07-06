import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  VStack,
  useToast,
  Center,
  Image,
  Input,
  Box,
  Grid,
} from "@chakra-ui/react";
import { APIBASEURL } from "../../assets/ApiManager";
import { BiCoffee } from "react-icons/bi";
import CoffeeLoader from "../shared_components/CoffeeLoader";
import {
  coffeePrimaryColor,
  coffeeSecondaryColor,
  coffeeHoverColor,
  borderRadius,
} from "../../assets/theme";
import CoffeeChoiceModal from "../shared_components/CoffeeChoiceModal/CoffeeChoiceModal";

const ByImageContainer = ({ userChoices, setUserChoices, onOpen, onClose, isOpen }) => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null); // State for storing the server response
  const toast = useToast();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  useEffect(() => {
    const urls = images.map((image) => image.url);
    setImageUrls(urls);
  }, [images]);


  const handleSubmit = async () => {
    if (images.length === 0) return;
    onClose();
    setIsLoading(true);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`file${index}`, image.file);
    });
    formData.append("user_choices", JSON.stringify(userChoices));

    try {
      const response = await fetch(APIBASEURL + "/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResponseData(result); // Update the state with the response data
        setIsLoading(false);
        toast({
          title: "Upload and processing successful.",
          description: "The images were uploaded and processed successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Upload failed.",
          description: result.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading the images:", error);
      toast({
        title: "Upload error.",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} h="100%" justify="space-between">
      <Text
        as="h1"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        m={4}
        color="gray.700"
      >
        Rate your coffee by image
      </Text>
      <Center
        w="60%"
        h={500}
        p={4}
        borderStyle="dotted"
        borderWidth="2px"
        borderColor={coffeeSecondaryColor}
        borderRadius={borderRadius}
        _hover={{ borderColor: coffeeHoverColor }}
        position="relative"
        overflow="hidden"
      >
        {isLoading ? (
          <CoffeeLoader />
        ) : (
          <>
            {imageUrls.length ? (
              <Grid
                templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
                gap={2}
                w="full"
                h="full"
              >
                {imageUrls.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    maxW="full"
                    maxH="full"
                    alt={`Uploaded image preview ${index + 1}`}
                  />
                ))}
              </Grid>
            ) : (
              <Text color="gray.500">Click to upload images</Text>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              opacity="0"
              position="absolute"
              w="full"
              h="full"
              cursor="pointer"
              multiple
            />
          </>
        )}
      </Center>
      <Button
        bg={coffeePrimaryColor}
        color="white"
        _hover={{ bg: coffeeHoverColor }}
        isDisabled={images.length === 0 || isLoading}
        onClick={onOpen}
        mb={4}
        rightIcon={<BiCoffee />}
      >
        Select Coffee Choices
      </Button>
      {responseData && (
        <Center
          w="full"
          p={4}
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="md"
          mt={4}
          bg="gray.50"
        >
          <Text as="pre" fontSize="md" textAlign="left">
            {JSON.stringify(responseData.matches, null, 2)}
          </Text>
        </Center>
      )}
      <CoffeeChoiceModal
        isOpen={isOpen}
        onClose={onClose}
        userChoices={userChoices}
        setUserChoices={setUserChoices}
        handleSubmit={handleSubmit}
      />
    </VStack>
  );
};

export default ByImageContainer;
