import React, { useEffect } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import coffee1 from '../../assets/images/coffee1.png';
import coffee2 from '../../assets/images/coffee2.png';
import coffee3 from '../../assets/images/coffee3.png';
import coffee4 from '../../assets/images/coffee4.png';
import coffee5 from '../../assets/images/coffee5.png';

const MotionBox = motion(Box);

const CoffeeBeanBackground = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.8 },
    }));
  }, [controls]);

  const imageVariants = [
    { initial: { y: '100%', opacity: 0 }, animate: controls, src: coffee1 },
    { initial: { x: '-100%', opacity: 0 }, animate: controls, src: coffee2 },
    { initial: { x: '100%', opacity: 0 }, animate: controls, src: coffee3 },
    { initial: { y: '-100%', opacity: 0 }, animate: controls, src: coffee4 },
    { initial: { y: '100%', opacity: 0 }, animate: controls, src: coffee5 },
  ];

  const blurVariants = {
    blurred: { filter: 'blur(30px)', transition: { delay: 1, duration: 1 } },
  };

  return (
    <Box position="fixed" width="100%" height="100vh" top="0" left="0" zIndex="-1" overflow="hidden">
      {imageVariants.map((variant, index) => (
        <MotionBox
          key={index}
          custom={index}
          initial={variant.initial}
          animate={{ ...variant.animate, ...blurVariants.blurred }}
          width="100%"
          height="100%"
          position="absolute"
        >
          <Image
            src={variant.src}
            alt={`Coffee Bean ${index + 1}`}
            objectFit="cover"
            width="100%"
            height="100%"
            opacity={0.9}
          />
        </MotionBox>
      ))}
    </Box>
  );
};

export default CoffeeBeanBackground;
