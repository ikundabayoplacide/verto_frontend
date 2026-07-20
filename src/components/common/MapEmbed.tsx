import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon paths broken by Vite's asset bundling
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapEmbedProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  label?: string;
  className?: string;
}

export default function MapEmbed({
  lat = -2.1486,
  lng = 30.058,
  zoom = 15,
  label = 'Verto Holdings Ltd — Nyamata, Bugesera',
  className = '',
}: MapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        `<strong style="font-size:13px">${label}</strong>`,
        { maxWidth: 220 }
      )
      .openPopup();

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom, label]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full rounded-2xl overflow-hidden ${className}`}
    />
  );
}
