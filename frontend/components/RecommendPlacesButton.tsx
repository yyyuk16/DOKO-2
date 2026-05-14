import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { recommendPlacesApi } from '@/api/endpoints/recommendPlaces';

import { UserLocation, Spot } from '@/api/types';

interface Props {
  limit: number;                    // 取得する件数
  location: UserLocation | null;    // 現在地 (useLocationTrackerから渡す)
  onSpotsFetched: (spots: Spot[]) => void; // データ取得成功時に親にデータを渡す関数
}

export const RecommendPlacesButton = ({ limit, location, onSpotsFetched }: Props) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    // 位置情報がまだない場合はアラートを出して終了
    if (!location) {
      Alert.alert("準備中", "現在地を取得しています...");
      return;
    }

    setLoading(true);

    try {
      // APIリクエスト用のデータ作成
      const requestData = {
        latitude: location.latitude,
        longitude: location.longitude,
        limit: limit,
        description_count: limit,
      };

      // API実行
      const result = await recommendPlacesApi.getRecommendPlaces(requestData);

      // 結果（Spotの配列）を親コンポーネントに渡す
      // resultが { spots: [...] } の形をしている前提
      if (result && result.spots) {
        onSpotsFetched(result.spots);
      } else {
        Alert.alert("通知", "スポットが見つかりませんでした");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("エラー", "スポット情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handlePress} 
      disabled={loading} // ロード中は押せないようにする
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>周辺スポットを{limit}件検索</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DA8B3C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    elevation: 3, // Androidの影
    shadowColor: '#000', // iOSの影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});