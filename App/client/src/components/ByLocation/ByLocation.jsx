import React, { useEffect, useState } from "react";
import { Container, Flex, Text, Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
import { renderToString } from "react-dom/server";
import { capitalizeName } from "../../assets/helpers";

// Custom icon for markers
const createCustomIcon = () => {
  const iconMarkup = renderToString(
    <FaLocationDot style={{ color: "#7498bf", fontSize: "24px" }} />
  );
  return L.divIcon({
    html: iconMarkup,
    className: "custom-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const ByLocation = ({ locationsOptions, setSelectedLocation }) => {
  const [locationCoordinates, setLocationCoordinates] = useState({});

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinates = {
        tel_aviv: [32.0853, 34.7818],
        jerusalem: [31.7683, 35.2137],
        haifa: [32.794, 34.9896],
        netanya: [32.3215, 34.8532],
      };
      setLocationCoordinates(coordinates);
    };

    fetchCoordinates();
  }, []);

  return (
    <Container maxW="container.xl" mt={4}>
      <Flex direction="column" height="80vh">
        <Text fontSize="2xl" mb={4}>
          Where do you drink your coffee?
        </Text>
        <Text fontSize="lg" mb={4} color="gray.600">
          Choose a location
        </Text>
        <Box flex="1" overflowY="auto" height="100%">
          <MapContainer
            center={[31.7683, 35.2137]}
            zoom={9}
            minZoom={9}
            maxZoom={9}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {locationsOptions.map((location) => {
              const coordinates = locationCoordinates[location.toLowerCase()];
              if (!coordinates) {
                return null;
              }
              return (
                <Marker
                  key={location}
                  position={coordinates}
                  icon={createCustomIcon()}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation(location);
                    },
                  }}
                >
                  <Tooltip permanent={false}>
                    {capitalizeName(location)}
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>
        </Box>
      </Flex>
    </Container>
  );
};

export default ByLocation;
