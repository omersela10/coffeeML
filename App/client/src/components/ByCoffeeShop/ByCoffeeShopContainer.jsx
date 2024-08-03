import React, { useEffect, useState } from "react";
import { APIBASEURL } from "../../assets/ApiManager";
import { Container, Flex, Text, Box, Wrap, WrapItem } from "@chakra-ui/react";
import CoffeeShopsJSON from "../../assets/fake_data/CoffeeShops.json";
import ImagesUrl from "../../assets/fake_data/ImagesUrl.json";
import CoffeeShopCard from "./components/CoffeShopCard";
const ByCoffeeShopContainer = () => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  // useEffect(() => {
  //     const fetchCoffeeShops = async () => {
  //         const cities = ["tel aviv", "netanya"];
  //         for (let city of cities) {
  //             try {
  //                 const url = `${APIBASEURL}/get_coffee_shops_by_location?city=${city}`;
  //                 const response = await fetch(url);
  //                 const data = await response.json();
  //                 setCoffeeShops((prev) => [...prev, ...data]);
  //             } catch (error) {
  //                 console.error('Error fetching coffee shops:', error);
  //             }
  //         }
  //     };

  //     fetchCoffeeShops();
  // }, []);

  useEffect(() => {
    setCoffeeShops(CoffeeShopsJSON);
  }, []);

  return (
    <Container maxW="container.xl" mt={4}>
      <Flex direction="column" height="80vh">
        <Text fontSize="2xl" mb={4}>
          By Coffee Shop
        </Text>
        <Box flex="1" overflowY="auto">
          <Wrap spacing="30px" justify="center" m={2}>
            {coffeeShops.map((shop, index) => (
              <WrapItem key={shop._id}>
                <CoffeeShopCard
                  shop={shop}
                  setSelectedShop={setSelectedShop}
                  image={ImagesUrl[index]}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Flex>
    </Container>
  );
};

export default ByCoffeeShopContainer;
