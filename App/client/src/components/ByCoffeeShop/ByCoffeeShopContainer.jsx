import React, { useEffect, useState } from 'react';
import { APIBASEURL } from '../../assets/ApiManager';
import { Container, Flex, Text, Box, Image, Wrap, WrapItem } from '@chakra-ui/react';

const ByCoffeeShopContainer = () => {
    const [coffeeShops, setCoffeeShops] = useState([]);

    useEffect(() => {
        const fetchCoffeeShops = async () => {
            const cities = ["tel aviv", "netanya"];
            for (let city of cities) {
                try {
                    const url = `${APIBASEURL}/get_coffee_shops_by_location?city=${city}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setCoffeeShops((prev) => [...prev, ...data]);
                } catch (error) {
                    console.error('Error fetching coffee shops:', error);
                }
            }
        };

        fetchCoffeeShops();
    }, []);

    return (
        <Container maxW="container.xl" mt={4}>
            <Flex direction="column" height="80vh">
                <Text fontSize="2xl" mb={4}>By Coffee Shop</Text>
                <Box flex="1" overflowY="auto">
                    <Wrap spacing="30px" justify="center" m={2}>
                        {coffeeShops.map((shop) => (
                            <WrapItem key={shop._id}>
                                <Box
                                    w="150px"
                                    h="200px"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    boxShadow="lg"
                                    bg="white"
                                    position="relative"
                                    _hover={{ boxShadow: "xl" , cursor: "pointer", transform: "scale(1.05)", transition: "all 0.2s ease-in-out"}}
                                >
                                    <Image 
                                        src={shop.image_url || 'https://www.creativefabrica.com/wp-content/uploads/2020/09/15/Coffee-Shop-Vector-Building-Illustration-Graphics-5493170-1-580x386.jpg'}
                                        alt={shop.name}
                                        h="100%"
                                        objectFit="cover"
                                    />
                                    <Box
                                        position="absolute"
                                        bottom="0"
                                        left="0"
                                        right="0"
                                        height="100%"
                                        bgGradient="linear(to-t, blackAlpha.800, blackAlpha.100)"
                                        p="4"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="flex-end"
                                        color="white"
                                    >
                                        <Text
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            noOfLines={1}
                                        >
                                            {shop.name}
                                        </Text>
                                        <Text fontSize="sm">{shop.vicinity}</Text>
                                    </Box>
                                </Box>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
            </Flex>
        </Container>
    );
};

export default ByCoffeeShopContainer;
