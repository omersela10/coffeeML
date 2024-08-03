import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { bgPrimaryColor, borderRadius } from "../../assets/theme";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
import ByImageContainer from "../ByImage/ByImageContainer";
import ByCoffeeShop from "../ByCoffeeShop/ByCoffeeShopContainer";
import ByLocation from "../ByLocation/ByLocation";
import { APIBASEURL } from "../../assets/ApiManager";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("byLocation");
  const [userChoices, setUserChoices] = useState({
    coffee_type: "cappuccino",
    // crema: true,
    // served_way: true,
    type_of_cup: true,
  });
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    console.log("get locations");
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const response = await fetch(APIBASEURL + "/get_locations", {
        method: "GET",
      });
      const data = await response.json();
      setLocationsOptions(data);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "byImage":
        return (
          <ByImageContainer
            userChoices={userChoices}
            setUserChoices={setUserChoices}
          />
        );
      case "byCoffeeShop":
        return <ByCoffeeShop />;
      case "byLocation":
        return <ByLocation locationsOptions={locationsOptions} setSelectedLocation={setSelectedLocation} />;
      default:
        return null;
    }
  };

  return (
    <Flex style={{ height: "85vh" }} gap={8} w={"100%"}>
      <LeftSidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        userChoices={userChoices}
        setUserChoices={setUserChoices}
      />
      <Box
        flex={1}
        bgColor={bgPrimaryColor}
        h="100%"
        borderRadius={borderRadius}
        mr={4}
      >
        {renderActiveComponent()}
      </Box>
    </Flex>
  );
};

export default Homepage;
