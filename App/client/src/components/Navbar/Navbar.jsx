import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logoWhiteNoBG from "../../assets/images/logo_white_nobg.png";
import { navbarPrimaryColor } from "../../assets/theme";

const Navbar = () => {
  return (
    <Box bg={navbarPrimaryColor} px={4} mb={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <img src={logoWhiteNoBG} alt="Logo" style={
            {
              height: "50px",
              marginTop:"2px",

            }
          }/>
        </Box>{" "}
        <Flex alignItems={"center"}>
          <Link
            as={RouterLink}
            to="/"
            px={2}
            color="white"

            _hover={{ textDecoration: "none", color: "gray.100" }}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/about"
            px={2}
            color="white"
            _hover={{ textDecoration: "none", color: "gray.100" }}
          >
            About
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
