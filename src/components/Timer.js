import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export const Timer = () => {
  // タイマーの値を保持するステート
  const [seconds, setSeconds] = useState(0);

  // タイマーが動作しているかをトラックするステート
  const [isActive, setIsActive] = useState(true);

  // useEffectフックを使用してタイマーのロジックを管理
  useEffect(() => {
    let interval;

    // isActiveがtrueの場合、setIntervalを使用してタイマーをスタート
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1); // タイマーの値をインクリメント
      }, 1000); // 1秒ごとに更新
    } else {
      clearInterval(interval); // isActiveがfalseの場合、タイマーをクリア
    }

    // クリーンアップ関数を返す
    // コンポーネントがアンマウントされるか、isActiveが変更されると実行される
    return () => clearInterval(interval);
  }, [isActive]); // isActiveが変更されるたびにuseEffectを再実行

  // タイマーのスタート・ストップを切り替える関数
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // タイマーのリセット関数
  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{seconds}秒</Text>
      <Button
        title={isActive ? "ストップ" : "スタート"}
        onPress={toggleTimer}
      />
      <Button title="リセット" onPress={resetTimer} />
    </View>
  );
};

export default Timer;
