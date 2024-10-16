import {useEffect, useState, useRef, useCallback} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';

interface GeolocationPositionError {
  code: number;
  message: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.01);

  const MIN_ZOOM = 0.001;
  const MAX_ZOOM = 0.1;
  const ZOOM_STEP = 0.005;

  const mapRef = useRef<MapView | null>(null);

  const animateMapToLocation = useCallback(
    (newLocation: {latitude: number; longitude: number}) => {
      if (mapRef.current) {
        mapRef.current.getCamera().then(() => {
          mapRef?.current?.animateToRegion(
            {
              ...newLocation,
              latitudeDelta: 0,
              longitudeDelta: 0,
            },
            200,
          );
        });
      }
    },
    [],
  );

  const updateLocation = useCallback(
    (latitude: number, longitude: number) => {
      const newLocation = {latitude, longitude};
      setLocation(newLocation);

      if (isFollowing) {
        animateMapToLocation(newLocation);
      }
    },
    [isFollowing, animateMapToLocation],
  );

  const showAlert = useCallback((title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK'}]);
  }, []);

  const handlePermissionError = useCallback(
    (message: string) => {
      setErrorMsg(message);
      showAlert('Permission Error', message);
    },
    [showAlert],
  );

  const handleGeolocationError = useCallback(
    (error: GeolocationPositionError) => {
      const errorMessages: Record<number, string> = {
        1: 'Location permission denied. Please enable location access in your device settings.',
        2: 'Unable to determine your location. This might be due to poor signal or the GPS being disabled.',
        3: 'The request to get your location took too long. Please ensure you have a stable connection and try again.',
      };

      showAlert(
        'Geolocation Error',
        errorMessages[error.code] ||
          'An unknown error occurred. Please try again later.',
      );
    },
    [showAlert],
  );

  const toggleFollowMode = () => setIsFollowing(prevState => !prevState);

  const reCenterMap = () => {
    if (location) {
      animateMapToLocation(location);
    }
  };

  const adjustZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prevZoom => {
      const newZoomLevel =
        direction === 'in'
          ? Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM)
          : Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM);

      if (mapRef.current) {
        mapRef.current.getCamera().then(camera => {
          const {latitude, longitude} = camera.center;
          mapRef.current?.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: newZoomLevel,
              longitudeDelta: newZoomLevel,
            },
            200,
          );
        });
      }

      return newZoomLevel;
    });
  };

  useEffect(() => {
    let watchId: number | null = null;

    const requestLocationPermission = async () => {
      try {
        const granted = await (Platform.OS === 'android'
          ? PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message:
                  'This app needs access to your location to display the map.',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
              },
            )
          : Geolocation.requestAuthorization('whenInUse'));

        if (
          granted === 'granted' ||
          granted === PermissionsAndroid.RESULTS.GRANTED
        ) {
          startLocationWatch();
        } else {
          handlePermissionError(
            'Location permission denied. Please enable location access in your device settings.',
          );
        }
      } catch (err) {
        handlePermissionError(
          'Error while requesting location permissions. Please try again.',
        );
      }
    };

    const startLocationWatch = () => {
      watchId = Geolocation.watchPosition(
        position =>
          updateLocation(position.coords.latitude, position.coords.longitude),
        handleGeolocationError,
        {enableHighAccuracy: false, distanceFilter: 50},
      );
    };

    requestLocationPermission();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [
    isFollowing,
    handlePermissionError,
    handleGeolocationError,
    updateLocation,
  ]);

  return {
    location,
    errorMsg,
    isFollowing,
    zoomLevel,
    MIN_ZOOM,
    MAX_ZOOM,
    mapRef,
    actions: {
      toggleFollowMode,
      reCenterMap,
      zoomIn: () => adjustZoom('in'),
      zoomOut: () => adjustZoom('out'),
    },
  };
};
