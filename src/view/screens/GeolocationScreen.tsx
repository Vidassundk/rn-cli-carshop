import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useGeolocation} from '../../viewmodel/data/geolocation/useGeolocation';

const GeolocationScreen = () => {
  const {
    location,
    errorMsg,
    isFollowing,

    mapRef,
    actions: {toggleFollowMode, reCenterMap, zoomIn, zoomOut},
  } = useGeolocation(); // Use the ViewModel

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            ref={mapRef} // Assign the reference to the MapView from ViewModel
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

          {/* Overlay with Coordinates */}
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesText}>
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordinatesText}>
              Longitude: {location.longitude.toFixed(6)}
            </Text>
          </View>

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <Button
              title={isFollowing ? 'Disable Follow Mode' : 'Enable Follow Mode'}
              onPress={toggleFollowMode}
            />
            <Button title="Re-center" onPress={reCenterMap} />

            {/* Zoom In Button */}

            <Button title="Zoom In" onPress={zoomIn} />

            <Button title="Zoom Out" onPress={zoomOut} />
          </View>
        </>
      ) : (
        <Text>{errorMsg ? errorMsg : 'Fetching location...'}</Text>
      )}
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
    bottom: 140,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  coordinatesText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default GeolocationScreen;
