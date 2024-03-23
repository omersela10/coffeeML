import React, { useState } from 'react';
import { Button, Text, VStack, useToast, Center, Image, Input } from '@chakra-ui/react';

const ByImageContainer = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const toast = useToast();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
            console.log(file);
        }
    };

    const handleSubmit = () => {
        // Handle the image upload or any other process here
        toast({
            title: "Image uploaded.",
            description: "Your image has been uploaded successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <VStack
            spacing={4}
            h="100%"
            justify="space-between" // This ensures spacing between items, pushing the button to the bottom
        >
            <Text as="h1" fontSize="2xl" fontWeight="bold" textAlign="center">
                By Image
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
            </Center>
            <Button
                colorScheme="blue"
                variant="outline"
                isDisabled={!image}
                onClick={handleSubmit}
                mb={4}
            >

                Upload Image
            </Button>
        </VStack>
    );
};

export default ByImageContainer;
