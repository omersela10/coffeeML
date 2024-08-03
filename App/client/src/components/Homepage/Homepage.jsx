import React, { useState, useEffect } from "react";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { bgPrimaryColor, borderRadius } from "../../assets/theme";
import LeftSidebar from "../LeftSideBar/LeftSideBar";
import ByImageContainer from "../ByImage/ByImageContainer";
import ByCoffeeShop from "../ByCoffeeShop/ByCoffeeShopContainer";
import ByLocation from "../ByLocation/ByLocation";
import { APIBASEURL } from "../../assets/ApiManager";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import CoffeeShopsWrapper from "../ByLocation/components/CoffeeShopsWrapper";
import CoffeeShopDisplay from "../ByLocation/components/CoffeeShopDisplay";
import CoffeeLoader from "../shared_components/CoffeeLoader";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("byLocation");
  const [userChoices, setUserChoices] = useState({
    coffee_type: "cappuccino",
    type_of_cup: true,
  });
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APIBASEURL}/get_locations`, {
        method: "GET",
      });
      const data = await response.json();
      setLocationsOptions(data);
    } catch (error) {
      console.error("Error fetching locations", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      getLocationResults();
    }
  }, [selectedLocation]);

  const getLocationResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APIBASEURL}/get_location_results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: selectedLocation,
          userChoices,
        }),
      });
      const data = await response.json();
      const filteredCoffeeShops = data.filter((shop) => shop.images.length > 0);
      const sortedByMatch = filteredCoffeeShops.sort((a, b) => {
        let res = (b.is_matched === true ? 1 : 0) - (a.is_matched === true ? 1 : 0);
        if (res === 0) {
          return b.quality - a.quality;
        }
        return res;
      });

      setCoffeeShops(sortedByMatch);
    } catch (error) {
      console.error("Error fetching locations", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComponent = () => {
    if (selectedShop) {
      return <CoffeeShopDisplay shop={selectedShop} />;
    }

    if (selectedLocation) {
      return (
        <CoffeeShopsWrapper coffeeShops={coffeeShops} location={selectedLocation} setSelectedShop={setSelectedShop} />
      );
    }

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
        return (
          <ByLocation
            locationsOptions={locationsOptions}
            setSelectedLocation={setSelectedLocation}
          />
        );
      default:
        return null;
    }
  };

  const handleBackButtonClick = () => {
    if (selectedShop) {
      setSelectedShop(null);
    } else if (selectedLocation) {
      setSelectedLocation(null);
      setCoffeeShops([]);
    }
  };

  return (
    <Flex style={{ height: "85vh" }} gap={8} w={"100%"}>
      <LeftSidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        userChoices={userChoices}
        setUserChoices={setUserChoices}
        isDisabled={!!selectedLocation}
      />
      <Box
        flex={1}
        bgColor={bgPrimaryColor}
        h="100%"
        borderRadius={borderRadius}
        mr={4}
      >
        <Box w={"100%"} h={10}>
          <IconButton
            variant="ghost"
            display={selectedLocation || selectedShop ? "flex" : "none"}
            m={2}
            aria-label="return"
            icon={<FaRegArrowAltCircleLeft />}
            onClick={handleBackButtonClick}
          />
        </Box>
        {isLoading ?
        
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="100%"
        ><CoffeeLoader /> </Box>: renderComponent()}
      </Box>
    </Flex>
  );
};

export default Homepage;
