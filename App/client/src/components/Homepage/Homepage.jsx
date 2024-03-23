import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { bgPrimaryColor, borderRadius } from '../../assets/theme';
import LeftSidebar from '../LeftSideBar/LeftSideBar';

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState('1');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case '1':
        return <h1>1</h1>;
      case '2':
        return <h1>2</h1>;
      case '3':
        return <h1>3</h1>;
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
      <Box flex={1} bgColor={bgPrimaryColor} h="100%"  borderRadius={borderRadius} mr={4}>
        {renderActiveComponent()}
      </Box>
    </Flex>
  );
};

export default Homepage;