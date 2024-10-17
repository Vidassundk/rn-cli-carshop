import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useGeolocation} from '@/viewmodels/data/useGeolocation';
import {useTheme} from '@/viewmodels/context/ThemeContext';

interface Location {
  latitude: number;
  longitude: number;
}

const GeolocationScreen: React.FC = () => {
  const {
    location,
    errorMsg,
    isFollowing,
    mapRef,
    actions: {toggleFollowMode, reCenterMap, zoomIn, zoomOut},
  } = useGeolocation();

  const {colors, spacing} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {location ? (
        <>
          <LocationMap location={location} mapRef={mapRef} />
          <CoordinatesDisplay location={location} />
          <Controls
            isFollowing={isFollowing}
            toggleFollowMode={toggleFollowMode}
            reCenterMap={reCenterMap}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
          />
        </>
      ) : (
        <Text
          style={[
            styles.errorText,
            {color: colors.text, marginTop: spacing.lg},
          ]}>
          {errorMsg || 'Fetching location...'}
        </Text>
      )}
    </View>
  );
};

interface LocationMapProps {
  location: Location;
  mapRef: React.RefObject<MapView>;
}

const LocationMap: React.FC<LocationMapProps> = ({location, mapRef}) => (
  <MapView
    testID="map-view"
    ref={mapRef}
    style={styles.map}
    initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}>
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title="Your Location"
    />
  </MapView>
);

interface CoordinatesDisplayProps {
  location: Location;
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({location}) => {
  const {colors, spacing} = useTheme();
  return (
    <View
      style={[
        styles.coordinatesContainer,
        {
          top: spacing.sm,
          backgroundColor: colors.card,
          opacity: 0.8,
          padding: spacing.sm,
          borderRadius: spacing.xs,
        },
      ]}>
      <Text
        testID="latitude-text"
        style={[styles.coordinatesText, {color: colors.text}]}>
        Latitude: {location.latitude.toFixed(6)}
      </Text>
      <Text
        testID="longitude-text"
        style={[styles.coordinatesText, {color: colors.text}]}>
        Longitude: {location.longitude.toFixed(6)}
      </Text>
    </View>
  );
};

interface ControlsProps {
  isFollowing: boolean;
  toggleFollowMode: () => void;
  reCenterMap: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isFollowing,
  toggleFollowMode,
  reCenterMap,
  zoomIn,
  zoomOut,
}) => {
  const {spacing} = useTheme();
  return (
    <View
      style={[
        styles.buttonContainer,
        {
          bottom: spacing.md,
          right: spacing.md,
          left: spacing.md,
        },
      ]}>
      <Button
        title={isFollowing ? 'Disable Follow Mode' : 'Enable Follow Mode'}
        onPress={toggleFollowMode}
      />
      <Button disabled={isFollowing} title="Re-center" onPress={reCenterMap} />
      <Button title="Zoom In" onPress={zoomIn} />
      <Button title="Zoom Out" onPress={zoomOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  coordinatesContainer: {
    position: 'absolute',
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  errorText: {
    textAlign: 'center',
  },
});

export default GeolocationScreen;
