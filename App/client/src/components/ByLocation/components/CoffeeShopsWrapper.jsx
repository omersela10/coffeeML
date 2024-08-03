import React from "react";
import {
  Container,
  Flex,
  Text,
  Box,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import CoffeeShopCard from "../../ByCoffeeShop/components/CoffeShopCard";
import ImagesUrl from "../../../assets/fake_data/ImagesUrl.json";
import { capitalizeName } from "../../../assets/helpers";

const CoffeeShopsWrapper = ({ coffeeShops, location, setSelectedShop }) => {
  return (
    <Container maxW="container.xl" mt={4}>
      <Flex direction="column" height="80vh">
        <Text fontSize="2xl" mb={4}>
          Coffee Shops in {capitalizeName(location)}
        </Text>
        <Box flex="1" overflowY="auto" maxHeight="90%">
          <Wrap spacing="30px" justify="center" m={2}>
            {coffeeShops.length > 0 ? (
              coffeeShops.map((shop, index) => (
                <WrapItem key={shop._id}>
                  <CoffeeShopCard
                    shop={shop}
                    image={ImagesUrl[index]}
                    setSelectedShop={setSelectedShop}
                  />
                </WrapItem>
              ))
            ) : (
              <Text>No coffee shops found</Text>
            )}
          </Wrap>
        </Box>
      </Flex>
    </Container>
  );
};

export default CoffeeShopsWrapper;
