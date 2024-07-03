import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { borderRadius } from "../../assets/theme";
import coffeVideo from '../../assets/videos/coffeVideo.mp4';
import { useNavigate } from "react-router-dom";
import CoffeeBeanBackground from "../CoffeeBeanBackground/CoffeeBeanBackground";
import WelcomeText from "./components/WelcomeText";

const MotionBox = motion(Box);

const Welcome = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate("/home");
  }

  const heading = "Welcome to Coffee-ML";
  const description = "Coffee-ML is revolutionizing the way we evaluate coffee quality. Our cutting-edge technology harnesses the power of machine learning to analyze the intricate details of the coffee, unveiling their true potential like never before.";
  const bulletPoints = [
    "Advanced image analysis algorithms",
    "Precise assessment of color and texture",
    "Identify subtle nuances in coffee",
    "Ensures a truly exceptional coffee experience"
  ];
  const strongText = "Why risk your enjoyment? Check your coffee first!";
  const buttonText = "Get Started";

  return (
    <>
      <CoffeeBeanBackground />
      {showContent && (
        <MotionBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="90vh"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Grid
            templateColumns={{ base: "1fr" }}
            gap={6}
            justifyContent="center"
            alignItems="center"
            p={4}
            borderRadius={borderRadius}
            bg="rgba(255,246,231,0.2)"
            backdropFilter="blur(10px)"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
            textAlign="center"
            w="75%"
            margin="auto"
          >
            <GridItem>
              <WelcomeText 
                heading={heading}
                description={description}
                bulletPoints={bulletPoints}
                strongText={strongText}
                buttonText={buttonText}
                handleButtonClick={handleGetStarted}
              />
            </GridItem>
            <GridItem>
              <Box width="100%" maxWidth="600px" mx="auto">
                <video
                  src={coffeVideo}
                  alt="Welcome Video"
                  autoPlay
                  loop
                  muted
                  style={{ borderRadius: borderRadius, width: '100%' }}
                />
              </Box>
            </GridItem>
          </Grid>
        </MotionBox>
      )}
    </>
  );
};

export default Welcome;
