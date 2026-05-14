import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import Logo from '@/assets/images/メインロゴ.svg';

interface Props {
  onFinish: () => void; // アニメーション終了時に呼ばれる関数
}

export const Eyecatch = ({ onFinish }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // 透明度初期値 0

  useEffect(() => {
    // 1. フェードイン
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // 1秒かけて表示
        useNativeDriver: true,
      }),
      // 2. 少し待機
      Animated.delay(1000),
      // 3. フェードアウト（オプション）
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 4. アニメーション完了後に親の関数を実行
      onFinish();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          // 画像ファイルが存在することを確認してください
          source={require('@/assets/images/メインロゴ.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <Text style={styles.logoText}>KOKO DOKO</Text> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // 背景色はアプリに合わせる
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject, // 画面全体を覆う
    zIndex: 999, // 最前面に表示
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: 400,
    height: 400,
  },
});