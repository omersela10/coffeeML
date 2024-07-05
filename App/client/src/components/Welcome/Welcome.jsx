import React, { useState, useEffect } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
  };

  const heading = "Welcome to Coffee-ML";
  const subheading = "Our goal is your satisfaction";

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
          <VStack width="100%">
            <WelcomeText heading={heading} subheading={subheading} />

            <Button
              onClick={handleGetStarted}
              mt={4}
              variant={"outline"}
              borderColor="#8B4513"
              color="#8B4513"
              _hover={{ bg: "#8B4513", color: "white" }}
              rounded={"full"}
              px={6}
              py={3}
              fontSize={"md"}
              fontWeight={"light"}
            >
              Get Started Now!
            </Button>
          </VStack>
        </MotionBox>
      )}
    </>
  );
};

export default Welcome;
