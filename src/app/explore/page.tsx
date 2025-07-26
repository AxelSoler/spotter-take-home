"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const SearchDestinations = dynamic(
  () => import("@/components/SearchDestinations"),
  {
    ssr: false
  }
);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Airport[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

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
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST
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

  const searchAirports = async () => {
    if (!searchQuery.trim()) return;
    setLoadingSearch(true);
    setSearchError(null);
    setSearchResults([]);
    try {
      const res = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST
          }
        }
      );
      const data = res.data;
      if (data.status && Array.isArray(data.data)) {
        setSearchResults(data.data);
      } else {
        setSearchError("No airports found or invalid response.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSearchError(err.message);
      } else {
        setSearchError("Error searching airports");
      }
    } finally {
      setLoadingSearch(false);
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
          <div className="font-bold mb-2">Search Airports</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="New York, Buenos Aires..."
              className="bg-gray-700 rounded px-3 py-2 text-white flex-1 placeholder:text-gray-400 outline-none"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold"
              onClick={searchAirports}
              disabled={loadingSearch || !searchQuery.trim()}
            >
              {loadingSearch ? (
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent" />
              ) : (
                "Search"
              )}
            </button>
          </div>
          <div className="mt-2">
            {searchError && (
              <p className="text-red-400 text-sm">{searchError}</p>
            )}
            {!searchError && !loadingSearch && searchResults.length > 0 && (
              <ul className="text-sm text-white divide-y divide-gray-700">
                {searchResults.map((airport, idx) => (
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
            {!searchError && !loadingSearch && searchResults.length === 0 && (
              <p className="text-gray-400 text-xs">No airports found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-3/4 h-full rounded-2xl hidden md:block">
        <SearchDestinations location={location} />
      </div>
    </div>
  );
}
