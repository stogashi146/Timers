import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Animated,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "../components/AddTimerModal";
import AddTimerModal from "../components/AddTimerModal";
interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [timers, setTimers] = useState<TimerData[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(58);
  const navigation = useNavigation();
  const toggleStartTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  // タイマーのリセット関数
  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsTimerActive(false);
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

  const onPressAddIcon = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "タイマー一覧",
      headerRight: () => (
        <AntDesign
          name="plus"
          size={24}
          color="black"
          style={{ paddingRight: 15, paddingTop: 5 }}
          onPress={() => setModalVisible(true)}
        />
      ),
    });
  }, []);

  // useEffectフックを使用してタイマーのロジックを管理
  useEffect(() => {
    let interval;

    // isTimerActiveがtrueの場合、setIntervalを使用してタイマーをスタート
    if (isTimerActive) {
      interval = setInterval(() => {
        countUpTimer(); // タイマーの値をインクリメント
      }, 1000); // 1秒ごとに更新
    } else {
      clearInterval(interval); // isTimerActiveがfalseの場合、タイマーをクリア
    }

    // クリーンアップ関数を返す
    // コンポーネントがアンマウントされるか、isTimerActiveが変更されると実行される
    return () => clearInterval(interval);
  }, [isTimerActive]); // isTimerActiveが変更されるたびにuseEffectを再実行

  // フォーム周りテスト
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<string>("");

  const handleSaveFormData = (data: string) => {
    setFormData(data);
  };

  return (
    <ScrollView>
      <View
        // onPress={() => {}}
        style={styles.timerListItem}
        // activeOpacity={1}
      >
        <View style={styles.leftContainer}>
          <Text style={styles.timerTitleText}>あああ</Text>
          <Text style={styles.timerCountTitleText}>{padStartTime()}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={resetTimer}>
            <Feather
              name="refresh-cw"
              size={28}
              color="black"
              style={styles.resetIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleStartTimer} style={{ width: 30 }}>
            {isTimerActive ? (
              <FontAwesome
                name="stop"
                size={28}
                color="black"
                style={styles.startIcon}
              />
            ) : (
              <AntDesign
                name="caretright"
                size={28}
                color="black"
                style={styles.startIcon}
              />
            )}
          </TouchableOpacity>
          {/* <View style={styles.amountContainer}>
            <Text style={styles.timerListItemAmount}>合計</Text>
          </View> */}
        </View>
      </View>
      <View>
        <AddTimerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveFormData}
        />
      </View>
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
    // height: 325,
  },
  leftContainer: {
    // flexDirection: "column",
    // alignItems: "flex-end",
    // justifyContent: "space-between",
  },
  timerListItem: {
    backgroundColor: "#FFFFFF",
    // height: 70,
    // 横並びにする
    flexDirection: "row",
    //要素間にスペースを開ける
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  timerTitleText: {
    fontSize: 16,
  },
  timerCountTitleText: {
    fontSize: 24,
  },
  // timerListItemDate: {
  //   fontSize: 12,
  //   lineHeight: 16,
  //   color: "#848484",
  // },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // timerListItemAmount: {
  //   fontSize: 16,
  //   fontWeight: "500",
  //   paddingRight: 10,
  // },
  resetIcon: {
    paddingRight: 15,
    color: "rgba(0,0,0,0.5)",
  },
  startIcon: {
    // paddingBottom: 15,
    color: "rgba(0,0,0,0.5)",
  },
  amountContainer: {
    alignSelf: "flex-end",
  },
});
