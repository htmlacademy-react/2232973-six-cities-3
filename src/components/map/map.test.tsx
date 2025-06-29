import { render } from '@testing-library/react';
import Map from './map';
import { vi } from 'vitest';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  const leafletMock = {
    ...actual,
    map: vi.fn(() => ({
      setView: vi.fn(),
      addLayer: vi.fn(),
      remove: vi.fn(),
    })),
    icon: vi.fn(() => ({})),
    marker: vi.fn(() => ({ addTo: vi.fn() })),
    layerGroup: vi.fn(() => ({
      addTo: vi.fn(() => ({ clearLayers: vi.fn() })),
      clearLayers: vi.fn(),
    })),
  };
  return {
    ...leafletMock,
    default: leafletMock,
  };
});

describe('Map component', () => {
  const city = {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
  };
  const offers = [
    {
      id: '1',
      city,
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      isFavorite: false,
      isPremium: false,
      price: 100,
      rating: 4,
      title: '',
      description: '',
      bedrooms: 1,
      goods: [],
      host: { name: '', avatarUrl: '', isPro: false },
      images: [],
      maxAdults: 2,
      previewImage: '',
      type: '',
    },
  ];

  it('renders map container', () => {
    const { container } = render(<Map city={city} offers={offers} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with selectedOfferId', () => {
    const { container } = render(<Map city={city} offers={offers} selectedOfferId="1" />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
