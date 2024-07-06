import React, { useState } from 'react';
import { Box, Flex, Button, useDisclosure } from '@chakra-ui/react';
import { bgPrimaryColor, borderRadius, coffeePrimaryColor } from '../../assets/theme';
import LeftSidebar from '../LeftSideBar/LeftSideBar';
import ByImageContainer from '../ByImage/ByImageContainer';
import ByCoffeeShop from '../ByCoffeeShop/ByCoffeeShop';
import ByLocation from '../ByLocation/ByLocation';

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState('byImage');
  const [userChoices, setUserChoices] = useState({
    coffee_type: 'cappuccino',
    // crema: true,
    // served_way: true,
    type_of_cup: true
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'byImage':
        return <ByImageContainer userChoices={userChoices} setUserChoices={setUserChoices} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />;
      case '2':
        return <ByCoffeeShop />;
      case '3':
        return <ByLocation />;
      default:
        return null;
    }
  };

  return (
    <Flex style={{ height: '85vh' }} gap={8} w={"100%"}>
      <LeftSidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <Box flex={1} bgColor={bgPrimaryColor} h="100%" borderRadius={borderRadius} mr={4}>
        {renderActiveComponent()}
      </Box>
    </Flex>
  );
};

export default Homepage;
