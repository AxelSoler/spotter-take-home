import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { customIcon } from "./PopularDestinations";

export type Location = {
  latitude: number;
  longitude: number;
};

type Props = {
  location?: Location | null;
  locations?: Location[] | null;
};

export default function SearchDestinations({ location, locations }: Props) {
  return (
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
        <Marker
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>Your Location</strong>
          </Popup>
        </Marker>
      )}
      {locations &&
        locations.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>Location</strong>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
