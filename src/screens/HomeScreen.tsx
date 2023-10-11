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
  const onToggleStartTimer = (index: number) => {
    const updatedTimers = [...timers];
    updatedTimers[index].isTimerActive = !updatedTimers[index].isTimerActive;
    setTimers(updatedTimers);

    setIsTimerActive(!isTimerActive);
  };
  console.log(timers);

  // タイマーのリセット関数
  const resetTimer = (index: number) => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsTimerActive(false);

    const updatedTimers = [...timers];
    updatedTimers[index].isTimerActive = false;
    updatedTimers[index].hours = 0;
    updatedTimers[index].minutes = 0;
    updatedTimers[index].seconds = 0;
    setTimers(updatedTimers);
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

  const toPadTime = (
    hours: number,
    minutes: number,
    seconds: number
  ): string => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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
    let interval: any;

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
  }, [timers]); // isTimerActiveが変更されるたびにuseEffectを再実行

  

  // フォーム周りテスト
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<string>("");

  const handleCreateTimer = (timerTitle: string) => {
    const maxId = numberingId();
    const addTimerData: TimerData = {
      id: maxId,
      name: timerTitle,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHour: 0,
      totalMinute: 0,
      totalSecond: 0,
      isTimerActive: false,
    };
    setTimers([...timers, addTimerData]);
  };

  const numberingId = () => {
    const length = timers.length;
    const maxId = length == 0 ? 1 : length + 1;

    return maxId;
  };

  // if (!timers) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Text>タイマーがありません</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView>
      {/* <View style={styles.timerListItem}>
        <View style={styles.leftContainer}>
          <Text style={styles.timerTitleText}>あああ</Text>
          <Text style={styles.timerCountTitleText}>
            {toPadTime(hours, minutes, seconds)}
          </Text>
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
          <TouchableOpacity onPress={onToggleStartTimer} style={{ width: 30 }}>
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
        </View>
      </View> */}
      {timers.map((timer, index) => {
        return (
          <View style={styles.timerListItem} key={timer.id}>
            <View style={styles.leftContainer}>
              <Text style={styles.timerTitleText}>{timer.name}</Text>
              <Text style={styles.timerCountTitleText}>
                {toPadTime(timer.hours, timer.minutes, timer.seconds)}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <TouchableOpacity onPress={() => resetTimer(index)}>
                <Feather
                  name="refresh-cw"
                  size={28}
                  color="black"
                  style={styles.resetIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onToggleStartTimer(index)}
                style={{ width: 30 }}
              >
                {timer.isTimerActive ? (
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
            </View>
          </View>
        );
      })}
      <View>
        <AddTimerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={handleCreateTimer}
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
