"use client";

import { useEffect, useState } from "react";
import { FaExchangeAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { customIcon } from "@/components/PopularDestinations";
import "leaflet/dist/leaflet.css";

interface Airport {
  skyId?: string;
  presentation?: {
    title?: string;
    suggestionTitle?: string;
    subtitle?: string;
  };
}

export default function Explore() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [nearbyAirports, setNearbyAirports] = useState<Airport[]>([]);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [airportError, setAirportError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const getNearByAirports = async () => {
    if (!location) return;
    setLoadingAirports(true);
    setAirportError(null);
    setNearbyAirports([]);
    try {
      const res = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${location.latitude}&lng=${location.longitude}`,
        {
          headers: {
            "x-rapidapi-key":
              "ff5c1935d1mshbcb01a1f12f6d6bp165040jsna142a1127723",
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com"
          }
        }
      );
      const data = res.data;
      if (data.status && data.data && Array.isArray(data.data.nearby)) {
        setNearbyAirports(data.data.nearby);
      } else {
        setAirportError("No airports found or invalid response.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAirportError(err.message);
      } else {
        setAirportError("Error fetching airports");
      }
    } finally {
      setLoadingAirports(false);
    }
  };

  return (
    <div className="flex h-screen pt-20 z-30">
      <div className="h-full w-full md:w-1/4 shadow-lg transform transition-transform duration-300 flex flex-col px-4">
        <div className="bg-gray-800 text-white p-4 rounded-xl flex flex-col gap-3 mt-4">
          {location ? (
            <div className="flex justify-between">
              <p>Your location:</p>
              <p>
                {location.latitude}, {location.longitude}
              </p>
            </div>
          ) : (
            <p>Getting location...</p>
          )}
          <button
            type="button"
            className={`bg-blue-500 hover:bg-blue-600 p-4 rounded font-bold ${
              location ? "cursor-pointer " : ""
            }
            `}
            disabled={!location || loadingAirports}
            onClick={getNearByAirports}
          >
            {loadingAirports ? "Loading..." : "Get Nearby Airports"}
          </button>
          <div className="mt-2">
            {airportError && (
              <p className="text-red-400 text-sm">{airportError}</p>
            )}
            {!airportError && !loadingAirports && nearbyAirports.length > 0 && (
              <ul className="text-sm text-white divide-y divide-gray-700">
                {nearbyAirports.map((airport, idx) => (
                  <li key={airport.skyId || idx} className="py-2">
                    <span className="font-bold">
                      {airport.presentation?.suggestionTitle ||
                        airport.presentation?.title}
                    </span>
                    {airport.presentation?.subtitle && (
                      <span className="ml-2 text-gray-400">
                        ({airport.presentation.subtitle})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {!airportError &&
              !loadingAirports &&
              nearbyAirports.length === 0 && (
                <p className="text-gray-400 text-xs">
                  No nearby airports found.
                </p>
              )}
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-xl flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <FaExchangeAlt className="text-gray-400" />
              Round trip
            </span>
            <span className="flex items-center gap-2">
              <FaUser className="text-gray-400" />2
            </span>
            <span className="flex items-center gap-1">
              Economy class
              <span className="text-gray-400">▼</span>
            </span>
          </div>

          <div className="flex flex-wrap bg-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-3 border-r border-gray-600 flex-1">
              <input
                type="text"
                placeholder="City"
                className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center justify-center px-3 border-r border-gray-600 text-gray-400">
              <FaExchangeAlt />
            </div>

            <div className="flex items-center px-4 py-3 border-r border-gray-600 flex-1">
              <FaMapMarkerAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Where you want to go?"
                className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center">
              <div className="flex items-center px-4 py-3 border-r border-gray-600 text-gray-400">
                <input
                  type="date"
                  placeholder="Departure"
                  className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center px-4 py-3 text-gray-400">
                <input
                  type="date"
                  placeholder="Return"
                  className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 h-full rounded-2xl hidden md:block">
        <MapContainer
          center={[location?.latitude || 20, location?.longitude || 0]}
          zoom={location ? 7 : 3}
          className="w-full h-full rounded-2xl"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && (
            <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
              <Popup>
                <strong>Tu ubicación</strong>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
