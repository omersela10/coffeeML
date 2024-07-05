import React, { useState } from 'react';
import { Button, Text, VStack, useToast, Center, Image, Input } from '@chakra-ui/react';
import { APIBASEURL } from '../../assets/ApiManager';
import { BiCoffee } from 'react-icons/bi';
import CoffeeLoader from '../shared_components/CoffeeLoader';

const ByImageContainer = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
            console.log(file);
        }
    };

    const handleSubmit = async () => {
        if (!image) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch(APIBASEURL + '/upload', { // Make sure to adjust the URL if necessary
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "Image uploaded.",
                    description: result.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
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
            console.error('Error uploading the image:', error);
            toast({
                title: "Upload error.",
                description: "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack
            spacing={4}
            h="100%"
            justify="space-between"
        >
            <Text as="h1" fontSize="2xl" fontWeight="bold" textAlign="center" m={4} color="gray.700">
                Rate your coffee by image
            </Text>
            <Center
                w="60%"
                h={500}
                p={4}
                borderStyle="dotted"
                borderWidth="2px"
                borderColor="gray.300"
                borderRadius="md"
                _hover={{ borderColor: "gray.500" }}
                position="relative"
                overflow="hidden"
            >
                {isLoading ? (
                    <CoffeeLoader />
                ) : (
                    <>
                        {imageUrl ? (
                            <Image src={imageUrl} maxW="full" maxH="full" alt="Uploaded image preview" />
                        ) : (
                            <Text color="gray.500">Click to upload image</Text>
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
                        />
                    </>
                )}
            </Center>
            <Button
                colorScheme="blue"
                variant="outline"
                isDisabled={!image || isLoading}
                onClick={handleSubmit}
                mb={4}
                rightIcon={<BiCoffee />}
            >
                Upload Image
            </Button>
        </VStack>
    );
};

export default ByImageContainer;
