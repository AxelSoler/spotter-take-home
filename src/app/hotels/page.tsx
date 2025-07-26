"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const SearchDestinations = dynamic(
  () => import("@/components/SearchDestinations"),
  {
    ssr: false
  }
);

interface Hotel {
  hierarchy: string;
  location: string;
  score: number;
  entityName: string;
  entityId: string;
  entityType: string;
  suggestItem: string;
  class: string;
  pois: null;
}

export default function Hotels() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
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

  const searchHotels = async () => {
    if (!searchQuery.trim()) return;
    setLoadingSearch(true);
    setSearchError(null);
    setSearchResults([]);
    try {
      const res = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${encodeURIComponent(
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
        setSearchError("No hotels found or invalid response.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSearchError(err.message);
      } else {
        setSearchError("Error searching hotels");
      }
    } finally {
      setLoadingSearch(false);
    }
  };

  const hotelLocations = searchResults?.length
    ? searchResults.map((place) => {
        const [latitudeStr, longitudeStr] = place.location.split(",");
        return {
          latitude: parseFloat(latitudeStr.trim()),
          longitude: parseFloat(longitudeStr.trim())
        };
      })
    : [];

  return (
    <div className="flex h-screen pt-20 z-30">
      <div className="h-full w-full md:w-1/2 shadow-lg transform transition-transform duration-300 flex flex-col px-4">
        <div className="bg-gray-800 text-white p-4 rounded-xl flex flex-col gap-3 mt-4">
          <div className="font-bold mb-2">Search Hotels</div>
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
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold cursor-pointer"
              onClick={searchHotels}
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
                {searchResults.map((hotel) => (
                  <li key={hotel.entityId} className="py-2">
                    <span className="font-bold">{hotel.entityName}</span>
                    <span className="ml-2 text-gray-400">
                      ({hotel.location})
                    </span>
                    <span className="text-xs text-yellow-400 mt-1 ml-auto">
                      ⭐ {hotel.score}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {!searchError && !loadingSearch && searchResults.length === 0 && (
              <p className="text-gray-400 text-xs">No hotels found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full rounded-2xl hidden md:block">
        <SearchDestinations location={location} locations={hotelLocations} />
      </div>
    </div>
  );
}
