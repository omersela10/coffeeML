import React from 'react';
import { Container, Flex, Text, Box, Wrap, WrapItem, Button } from "@chakra-ui/react";
import { capitalizeName } from '../../assets/helpers';

const ByLocation = ({ locationsOptions , setSelectedLocation }) => {
    return (
        <Container maxW="container.xl" mt={4}>
        <Flex direction="column" height="80vh">
          <Text fontSize="2xl" mb={4}>
            Where do you drink your coffee?
          </Text>
            <Text fontSize="lg" mb={4} color="gray.600">
                Choose a location
            </Text>
          <Box flex="1" overflowY="auto">
            {/* dropdown */}
            <Wrap spacing={4}>
            {locationsOptions.map((location) => (
              <WrapItem key={location}>
                <Button
                  backgroundColor="#D2B48C" // Light brown color
                  color="white"
                  fontWeight="medium"
                  borderRadius="md"
                  px={6}
                  py={4}
                  onClick={() => setSelectedLocation(location)}
                  _hover={{ bg: "#C3A384" }} // Slightly darker shade for hover
                  _active={{ bg: "#A67C52" }} // Even darker shade for active
                >
                  {capitalizeName(location)}
                </Button>
              </WrapItem>
            ))}
            </Wrap>
          </Box>
        </Flex>
      </Container>
    );
};

export default ByLocation;