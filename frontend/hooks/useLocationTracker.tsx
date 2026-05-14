import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { UserLocation } from '@/api/types';

export const useLocationTracker = (enabled: boolean = true) => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let subscriber: Location.LocationSubscription | null = null;

    // console.log("in useLocationTracker");

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('位置情報の使用が許可されていません');
        return;
      }

      try {
        // console.log("start tracking");
        const initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation({
          latitude: initialLocation.coords.latitude,
          longitude: initialLocation.coords.longitude,
          timestamp: initialLocation.timestamp,
        });
        
        subscriber = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 5,
          },
          (newLocation) => {
            setLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              timestamp: newLocation.timestamp,
            });
          }
        );
      } catch (error) {
        setErrorMsg('位置情報の取得に失敗しました');
      }
    };

    startTracking();

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  },[enabled]);

  return { location, errorMsg };
};