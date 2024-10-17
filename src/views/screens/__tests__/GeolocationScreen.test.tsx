import {render} from '@testing-library/react-native';
import GeolocationScreen from '../GeolocationScreen';
import {useGeolocation} from '@/viewmodels/data/useGeolocation';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import React from 'react';

jest.mock('@/viewmodels/data/useGeolocation');
jest.mock('@/viewmodels/context/ThemeContext');
jest.mock('react-native-maps', () => {
  const {View} = require('react-native');

  const MockMapView = ({children, testID}: any) => (
    <View testID={testID}>{children}</View>
  );
  const MockMarker = ({testID}: any) => <View testID={testID} />;

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

describe('GeolocationScreen', () => {
  const mockUseGeolocation = useGeolocation as jest.MockedFunction<
    typeof useGeolocation
  >;

  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  const toggleFollowModeMock = jest.fn();
  const reCenterMapMock = jest.fn();
  const zoomInMock = jest.fn();
  const zoomOutMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGeolocation.mockReturnValue({
      location: {latitude: 37.78825, longitude: -122.4324},
      errorMsg: null,
      isFollowing: false,
      zoomLevel: 10,
      MIN_ZOOM: 5,
      MAX_ZOOM: 20,
      mapRef: React.createRef(),
      actions: {
        toggleFollowMode: toggleFollowModeMock,
        reCenterMap: reCenterMapMock,
        zoomIn: zoomInMock,
        zoomOut: zoomOutMock,
      },
    });

    mockUseTheme.mockReturnValue({
      colors: {
        background: '#fff',
        text: '#000',
        card: '#f0f0f0',
        border: '#ccc',
        primary: '#6200ee',
        notification: '#f50057',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
    } as any);
  });

  it('renders correctly when location is available', () => {
    const {getByText, getByTestId} = render(<GeolocationScreen />);

    expect(getByTestId('map-view')).toBeTruthy();

    const latitudeText = getByTestId('latitude-text').props.children.join('');
    expect(latitudeText).toBe('Latitude: 37.788250');

    const longitudeText = getByTestId('longitude-text').props.children.join('');
    expect(longitudeText).toBe('Longitude: -122.432400');

    expect(getByText('Enable Follow Mode')).toBeTruthy();
    expect(getByText('Re-center')).toBeTruthy();
    expect(getByText('Zoom In')).toBeTruthy();
    expect(getByText('Zoom Out')).toBeTruthy();
  });

  it('renders error message when location is not available', () => {
    mockUseGeolocation.mockReturnValueOnce({
      location: null,
      errorMsg: 'Location error',
      isFollowing: false,
      zoomLevel: 10,
      MIN_ZOOM: 5,
      MAX_ZOOM: 20,
      mapRef: React.createRef(),
      actions: {
        toggleFollowMode: toggleFollowModeMock,
        reCenterMap: reCenterMapMock,
        zoomIn: zoomInMock,
        zoomOut: zoomOutMock,
      },
    });

    const {getByText, queryByTestId} = render(<GeolocationScreen />);

    expect(queryByTestId('map-view')).toBeNull();

    expect(getByText('Location error')).toBeTruthy();
  });
});
