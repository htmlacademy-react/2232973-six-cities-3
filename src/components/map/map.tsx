import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';
import { City, Offer } from '@/types/offers';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOfferId?: string | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg'
});

const highlightedIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg'
});


function Map({ city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markersLayer = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (map) {
      if (!markersLayer.current) {
        markersLayer.current = leaflet.layerGroup().addTo(map);
      }
      markersLayer.current.clearLayers();

      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: offer.id === selectedOfferId ? highlightedIcon : defaultCustomIcon,
            }
          )
          .addTo(markersLayer.current!);
      });
    }
  }, [map, offers, selectedOfferId, city]);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
