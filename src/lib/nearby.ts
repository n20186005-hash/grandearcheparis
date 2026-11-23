import type { Locale } from '@/i18n/routing';
import places from './nearby-places.json';

export const SITE_URL = 'https://www.grandearcheparis.com';
export const NEARBY = places;
export type NearbyPlace = (typeof NEARBY)[number];

export function nearbyPath(locale: Locale, slug: string) {
  return `/${locale}/nearby/${slug}`;
}

export function mapSearch(place: NearbyPlace) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.district}, Paris La Défense`)}`;
}

export function walkingDirections(place: NearbyPlace) {
  return `https://www.google.com/maps/dir/?api=1&origin=Grande+Arche+de+la+Defense&destination=${encodeURIComponent(place.coordinates)}&travelmode=walking`;
}

export function nearestPlaces(place: NearbyPlace) {
  const [lat, lon] = place.coordinates.split(',').map(Number);
  function distance(candidate: NearbyPlace) {
    const [otherLat, otherLon] = candidate.coordinates.split(',').map(Number);
    return (lat - otherLat) ** 2 + ((lon - otherLon) * Math.cos(lat * Math.PI / 180)) ** 2;
  }
  return NEARBY.filter((candidate) => candidate !== place)
    .sort((a, b) => distance(a) - distance(b))
    .slice(0, 2);
}
