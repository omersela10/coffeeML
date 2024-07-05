import React from 'react';
import { Center } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import coffeeLoader from '../../assets/lottie/coffeLoader.json'

const CoffeeLoader = () => {
    return (
        <Center w="60%" h={200} p={4} position="relative" overflow="hidden">
            <Lottie animationData={coffeeLoader} loop={true} style={{ width: '100%', height: '100%' }} />
        </Center>
    );
};

export default CoffeeLoader;
