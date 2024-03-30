import React from "react";
import {
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import logo from "../../../public/Appicon.png";
import { bgPrimaryColor, borderRadius } from "../../assets/theme";
import coffeVideo from '../../assets/videos/coffeVideo.mp4'
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigation = useNavigate();

    const handleGetStarted = () => {
        navigation("/home");
    }
return (
    <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        justifyContent="center"
        p={4}
        h={"85vh"}
        m={4}
        borderRadius={borderRadius}
        bg={bgPrimaryColor}
    >
        <GridItem m={4}>
            <Box textAlign={{ base: "center", md: "left" }}>
                <Image src={logo} alt="Logo" mb={4} h={100} w={100} />
                <Heading mb={2}>Welcome to Coffee-ML</Heading>
                <Text mb={6}>
                    Coffee-ML is revolutionizing the way we evaluate coffee quality. Our
                    cutting-edge technology harnesses the power of machine learning to
                    analyze the intricate details of the coffee, unveiling their true
                    potential like never before.
                    <br />
                    <br />
                    With our advanced image analysis algorithms, we can precisely assess
                    the color, texture, and even the subtle nuances that define a truly
                    exceptional coffee experience. 
                    <br />
                </Text>
                <Text mb={4}>
                    <strong>Why risk your enjoynment? Check your coffee first! </strong>
                </Text>
                <Button colorScheme="teal" size="lg" onClick={
                    handleGetStarted
                }>
                    Get Started
                </Button>
            </Box>
        </GridItem>
        <GridItem m={4}>
        <GridItem m={4}>
  <video
    src={coffeVideo}
    alt="Welcome Video"
    autoPlay
    loop
    muted
    style={{ borderRadius: borderRadius }}
  />
</GridItem>
        </GridItem>
    </Grid>
);
};

export default Welcome;
