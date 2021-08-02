/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React, { useEffect, useState } from 'react';

import Geocoder from 'react-native-geocoder';
import Geolocation from '@react-native-community/geolocation';

// Geolocation.getCurrentPosition(info => console.log(info));

const App: () => React$Node = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [postalCode, setPostalCode] = useState(0);

  useEffect(() => {
    
    Geolocation.getCurrentPosition(data => {
      // console.log(data.coords.latitude);
      // console.log(data.coords.longitude);
      setLatitude(data.coords.latitude);
      setLongitude(data.coords.longitude);

      // Position Geocoding
      const NY = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
      };

      Geocoder.geocodePosition(NY).then (result => {
        console.log(result);
        setPostalCode(result[0].postalCode);
      }).catch ( err => {
        Alert.alert('Error', err);
      });
    }).catch ( err => {
      Alert.alert('Error', err);
    });
  }, [])

  // navigator.geolocation.watchPosition((position) => {
  //   console.log(position);
  // });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text style={{fontSize:30}}>Latitude is {latitude}</Text>
          <Text style={{fontSize:30}}>Longitude is {longitude}</Text>
          <Text style={{fontSize:30}}>PostalCode is {postalCode}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
