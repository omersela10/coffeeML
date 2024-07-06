import React from "react";
import { Box, Divider, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import logoWhiteNoBG from "../../assets/images/logo_white_nobg.png";
import { navbarPrimaryColor } from "../../assets/theme";

const Navbar = ({ links }) => {
  const location = useLocation();
  const activeColor = useColorModeValue("yellow.50", "yellow.300");

  return (
    <Box bg={navbarPrimaryColor} px={4} mb={4} borderBottomWidth={2} borderColor={activeColor} boxShadow={"md"} position={"sticky"} top={0} zIndex={10}>
      <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <img
            src={logoWhiteNoBG}
            alt="Logo"
            style={{
              height: "50px",
              marginTop: "2px",
            }}
          />
        </Box>
        <Flex alignItems={"center"}>
          <Divider orientation="vertical" h={6} mx={2} />
          {links.map((link) => (
            <>

            <Link
              as={RouterLink}
              to={link.to}
              px={2}
              color={location.pathname === link.to ? activeColor : "white"}
              fontWeight={location.pathname === link.to ? "bold" : "normal"}
              _hover={{ textDecoration: "none", color: "gray.100" }}
              key={link.to}
            >
              {link.label}
            </Link>
          <Divider orientation="vertical" h={6} mx={2} />
            </>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
