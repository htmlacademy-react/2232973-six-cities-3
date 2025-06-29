import { renderHook } from '@testing-library/react';
import useMap from './useMap';
import { vi } from 'vitest';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  const mapMock = { setView: vi.fn() };
  const leafletMock = {
    map: vi.fn(() => mapMock),
    tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
    icon: vi.fn(() => ({})),
    marker: vi.fn(() => ({ addTo: vi.fn() })),
    layerGroup: vi.fn(() => ({
      addTo: vi.fn(() => ({ clearLayers: vi.fn() })),
      clearLayers: vi.fn(),
    })),
  };
  return {
    ...actual,
    ...leafletMock,
    default: { ...actual, ...leafletMock },
  };
});


describe('useMap', () => {
  const city = {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
  };

  it('returns null if ref is not set', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useMap(ref, city));
    expect(result.current).toBeNull();
  });

  it('sets map when ref is set', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useMap(ref, city));
    expect(result.current).not.toBeNull();
  });
});
