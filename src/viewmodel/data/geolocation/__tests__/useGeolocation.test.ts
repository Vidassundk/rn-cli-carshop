import {renderHook, act} from '@testing-library/react-hooks';
import {useGeolocation} from '../useGeolocation';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

jest.mock('react-native-geolocation-service', () => ({
  requestAuthorization: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}));

describe('useGeolocation Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should request location permission and start watching location', async () => {
    const requestAuthorizationMock =
      Geolocation.requestAuthorization as jest.Mock;
    const watchPositionMock = Geolocation.watchPosition as jest.Mock;

    requestAuthorizationMock.mockResolvedValue('granted');

    const mockPosition = {
      coords: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    };

    watchPositionMock.mockImplementation(successCallback => {
      successCallback(mockPosition);
      return 1;
    });

    const {result, waitForNextUpdate} = renderHook(() => useGeolocation());

    await waitForNextUpdate();

    expect(requestAuthorizationMock).toHaveBeenCalled();
    expect(watchPositionMock).toHaveBeenCalled();

    expect(result.current.location).toEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude,
    });
  });

  it('should handle permission denied', async () => {
    const requestAuthorizationMock =
      Geolocation.requestAuthorization as jest.Mock;

    requestAuthorizationMock.mockResolvedValue('denied');

    const {result, waitForNextUpdate} = renderHook(() => useGeolocation());

    await waitForNextUpdate();

    expect(result.current.errorMsg).toBe(
      'Location permission denied. Please enable location access in your device settings.',
    );
  });

  it('should handle location updates', async () => {
    const requestAuthorizationMock =
      Geolocation.requestAuthorization as jest.Mock;
    const watchPositionMock = Geolocation.watchPosition as jest.Mock;

    requestAuthorizationMock.mockResolvedValue('granted');

    let positionCallback: any;

    watchPositionMock.mockImplementation(
      (successCallback, _errorCallback, _options) => {
        positionCallback = successCallback;
        return 1;
      },
    );

    const {result} = renderHook(() => useGeolocation());

    await act(async () => {});

    expect(positionCallback).toBeDefined();

    act(() => {
      positionCallback({
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      });
    });

    expect(result.current.location).toEqual({
      latitude: 40.7128,
      longitude: -74.006,
    });
  });

  it('should toggle follow mode', () => {
    const {result} = renderHook(() => useGeolocation());

    expect(result.current.isFollowing).toBe(false);

    act(() => {
      result.current.actions.toggleFollowMode();
    });

    expect(result.current.isFollowing).toBe(true);
  });

  it('should recenter map when requested', async () => {
    const requestAuthorizationMock =
      Geolocation.requestAuthorization as jest.Mock;
    const watchPositionMock = Geolocation.watchPosition as jest.Mock;

    requestAuthorizationMock.mockResolvedValue('granted');

    let positionCallback: any;

    watchPositionMock.mockImplementation(
      (successCallback, _errorCallback, _options) => {
        positionCallback = successCallback;
        return 1;
      },
    );

    const mockAnimateToRegion = jest.fn();
    const mockGetCamera = jest.fn().mockResolvedValue({
      center: {latitude: 0, longitude: 0},
      zoom: 10,
    });

    const {result} = renderHook(() => useGeolocation());

    await act(async () => {});

    expect(positionCallback).toBeDefined();

    act(() => {
      result.current.mapRef.current = {
        animateToRegion: mockAnimateToRegion,
        getCamera: mockGetCamera,
      } as any;
    });

    act(() => {
      positionCallback({
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      });
    });

    await act(async () => {
      result.current.actions.reCenterMap();
    });

    expect(mockAnimateToRegion).toHaveBeenCalledWith(
      expect.objectContaining({
        latitude: 51.5074,
        longitude: -0.1278,
      }),
      0,
    );
  });

  it('should adjust zoom level when zoomIn and zoomOut are called', async () => {
    const {result} = renderHook(() => useGeolocation());

    const initialZoomLevel = result.current.zoomLevel;

    const mockAnimateToRegion = jest.fn();
    const mockGetCamera = jest.fn().mockResolvedValue({
      center: {latitude: 0, longitude: 0},
      zoom: 10,
    });

    act(() => {
      result.current.mapRef.current = {
        animateToRegion: mockAnimateToRegion,
        getCamera: mockGetCamera,
      } as any;
    });

    await act(async () => {
      await result.current.actions.zoomIn();
    });

    expect(result.current.zoomLevel).toBeLessThan(initialZoomLevel);
    expect(mockAnimateToRegion).toHaveBeenCalled();

    mockAnimateToRegion.mockClear();

    await act(async () => {
      await result.current.actions.zoomOut();
    });

    expect(result.current.zoomLevel).toBeGreaterThanOrEqual(initialZoomLevel);
    expect(mockAnimateToRegion).toHaveBeenCalled();
  });

  it('should clear watch on unmount', async () => {
    const requestAuthorizationMock =
      Geolocation.requestAuthorization as jest.Mock;
    const watchPositionMock = Geolocation.watchPosition as jest.Mock;
    const clearWatchMock = Geolocation.clearWatch as jest.Mock;

    requestAuthorizationMock.mockResolvedValue('granted');

    watchPositionMock.mockReturnValue(1);

    const {unmount} = renderHook(() => useGeolocation());

    await act(async () => {});

    unmount();

    expect(clearWatchMock).toHaveBeenCalledWith(1);
  });

  it('should handle errors from Geolocation', async () => {
    const requestAuthorizationMock =
      Geolocation.requestAuthorization as jest.Mock;
    const watchPositionMock = Geolocation.watchPosition as jest.Mock;
    const alertMock = jest.spyOn(Alert, 'alert');

    requestAuthorizationMock.mockResolvedValue('granted');

    watchPositionMock.mockImplementation((_, errorCallback) => {
      errorCallback({code: 2});
      return 1;
    });

    renderHook(() => useGeolocation());

    await act(async () => {});

    expect(alertMock).toHaveBeenCalledWith(
      'Geolocation Error',
      'Unable to determine your location. This might be due to poor signal or the GPS being disabled.',
      [{text: 'OK'}],
    );
  });
});
