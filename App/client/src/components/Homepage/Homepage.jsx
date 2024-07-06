import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { bgPrimaryColor, borderRadius } from '../../assets/theme';
import LeftSidebar from '../LeftSideBar/LeftSideBar';
import ByImageContainer from '../ByImage/ByImageContainer';
import ByCoffeeShop from '../ByCoffeeShop/ByCoffeeShop';
import ByLocation from '../ByLocation/ByLocation';

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState('byImage');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'byImage':
        return <ByImageContainer />;
      case '2':
        return <ByCoffeeShop />;
      case '3':
        return <ByLocation  />;
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
      <Box flex={1} bgColor={bgPrimaryColor} h="100%"  borderRadius={borderRadius} mr={4} >
        {renderActiveComponent()}
      </Box>
    </Flex>
  );
};

export default Homepage;