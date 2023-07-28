import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { MapPinIcon } from "@heroicons/react/20/solid";
import "leaflet/dist/leaflet.css";
import { useEffectOnce } from "../utils/useEfftect";
import axios from "axios";
import L, { map } from "leaflet";
import Message from "./Message";
const LelfLet = () => {
  const [chartData, setChartData] = useState<any>();
  useEffectOnce(() => {
    const serverUrl = "https://disease.sh/v3/covid-19/countries";
    const fetchData = async () => {
      await axios
        .get(serverUrl)
        .then((response) => setChartData(response?.data));
    };
    fetchData();
  });
  const markerIcon = new L.Icon({
    iconUrl: "https://www.svgrepo.com/show/513317/location-pin.svg",
    iconSize: [45, 55],
  });

  return (
    <MapContainer center={[20, 77]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='<a href="https://cloud.maptiler.com/>MapTiler<a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=lxDUAghwIjQJJhrPCwng"
      />

      {chartData &&
        chartData?.map((res: any, index: any) => (
          <Marker
            position={[
              res?.countryInfo?.lat ? res?.countryInfo?.lat : 0,
              res?.countryInfo?.long ? res?.countryInfo?.long : 0,
            ]}
            icon={markerIcon}
            key={index}
          >
            {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
            <Tooltip>
              <Message data={res} />
            </Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default LelfLet;
