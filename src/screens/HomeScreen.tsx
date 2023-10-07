import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [isActive, setIsActive] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(58);

  const toggleStartTimer = () => {
    setIsActive(!isActive);
  };

  // タイマーのリセット関数
  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  const countUpTimer = () => {
    setSeconds((prevSeconds) => {
      const newSeconds = prevSeconds + 1;
      console.log(newSeconds); // 更新後の秒数をログに出力

      if (newSeconds === 60) {
        setSeconds(0);
        setMinutes((prevMinutes) => {
          const newMinutes = prevMinutes + 1;
          if (newMinutes === 60) {
            setMinutes(0);
            setHours((prevHours) => prevHours + 1);
          }
          return newMinutes;
        });
      }

      return newSeconds;
    });
  };

  const padStartTime = (): string => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // useEffectフックを使用してタイマーのロジックを管理
  useEffect(() => {
    let interval;

    // isActiveがtrueの場合、setIntervalを使用してタイマーをスタート
    if (isActive) {
      interval = setInterval(() => {
        countUpTimer(); // タイマーの値をインクリメント
      }, 1000); // 1秒ごとに更新
    } else {
      clearInterval(interval); // isActiveがfalseの場合、タイマーをクリア
    }

    // クリーンアップ関数を返す
    // コンポーネントがアンマウントされるか、isActiveが変更されると実行される
    return () => clearInterval(interval);
  }, [isActive]); // isActiveが変更されるたびにuseEffectを再実行

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {}}
        style={styles.timerListItem}
        activeOpacity={1}
      >
        <View style={styles.leftContainer}>
          <Text style={styles.timerTextTitle}>{padStartTime()}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={toggleStartTimer}>
            {isActive ? (
              <FontAwesome
                name="stop"
                size={24}
                color="black"
                style={styles.startIcon}
              />
            ) : (
              <AntDesign
                name="caretright"
                size={24}
                color="black"
                style={styles.startIcon}
              />
            )}
          </TouchableOpacity>
          {/* <View style={styles.amountContainer}>
            <Text style={styles.timerListItemAmount}>合計</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  timerListContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    height: 325,
  },
  leftContainer: {
    // flexDirection: "column",
    // alignItems: "flex-end",
    // justifyContent: "space-between",
  },
  timerListItem: {
    height: 80,
    // 横並びにする
    flexDirection: "row",
    //要素間にスペースを開ける
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  timerTextTitle: {
    fontSize: 24,
    lineHeight: 32,
  },
  timerListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  timerListItemAmount: {
    fontSize: 16,
    fontWeight: "500",
    paddingRight: 10,
  },
  startIcon: {
    paddingBottom: 15,
    color: "rgba(0,0,0,0.5)",
  },
  amountContainer: {
    alignSelf: "flex-end",
  },
});
