import React, { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddTimerModal from "../components/AddTimerModal";
import { log } from "console";

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [timers, setTimers] = useState<TimerData[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigation = useNavigation();

  const timerRefs = useRef([]);
  const updateTimer = useCallback((index: number) => {
    console.log("タイマー作動");
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      const timer = updatedTimers[index];

      timer.seconds += 1;
      if (timer.seconds === 60) {
        timer.seconds = 0;
        timer.minutes += 1;
        if (timer.minutes === 60) {
          timer.minutes = 0;
          timer.hours += 1;
        }
      }
      return updatedTimers;
    });
  }, []);

  const onToggleStartTimer = useCallback(
    (index: number) => {
      const updatedTimers = [...timers];
      const timer = updatedTimers[index];

      if (timer.isTimerActive) {
        // タイマーがアクティブなので、それを停止します。
        clearInterval(timerRefs.current[index]);
      } else {
        // タイマーを開始し、そのIDをrefに保存します。
        const intervalId = setInterval(() => updateTimer(index), 1000);
        timerRefs.current[index] = intervalId;
      }

      // タイマーの状態を更新します。
      timer.isTimerActive = !timer.isTimerActive;
      setTimers(updatedTimers);
    },
    [updateTimer, timers]
  );

  // コンポーネントのクリーンアップを行うためのuseEffect。
  useEffect(() => {
    return () => {
      // コンポーネントのアンマウント時にすべてのタイマーをクリアします。
      timerRefs.current.forEach(clearInterval);
    };
  }, []);

  const resetTimer = (index: number) => {
    const updatedTimers = [...timers];
    const timer = updatedTimers[index];
    clearInterval(timer.intervalId); // Clear the interval
    timer.hours = 0;
    timer.minutes = 0;
    timer.seconds = 0;
    timer.totalHour = 0;
    timer.totalMinute = 0;
    timer.totalSecond = 0;
    timer.isTimerActive = false;
    clearInterval(timerRefs.current[index]);
    setTimers(updatedTimers);
  };

  const deleteTimer = (index: number) => {
    const updatedTimers = [...timers];
    updatedTimers.splice(index, 1);
    setTimers(updatedTimers);
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
    const maxId = length === 0 ? 1 : length + 1;
    return maxId;
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
    // Cleanup intervals when component unmounts
    return () => {
      timers.forEach((timer) => {
        if (timer.intervalId) {
          clearInterval(timer.intervalId);
        }
      });
    };
  }, [timers]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<string>("");

  return (
    <ScrollView>
      {timers.map((timer, index) => (
        <View style={styles.timerListItem} key={timer.id}>
          <View style={styles.leftContainer}>
            <Text style={styles.timerTitleText}>{timer.name}</Text>
            <Text style={styles.timerCountTitleText}>
              {toPadTime(timer.hours, timer.minutes, timer.seconds)}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => deleteTimer(index)}>
              <AntDesign
                name="close"
                size={30}
                color="black"
                style={styles.btnIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => resetTimer(index)}>
              <Feather
                name="refresh-cw"
                size={30}
                color="black"
                style={styles.btnIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onToggleStartTimer(index)}
              style={{ width: 30 }}
            >
              {timer.isTimerActive ? (
                <FontAwesome
                  name="stop"
                  size={30}
                  color="black"
                  style={styles.btnIcon}
                />
              ) : (
                <AntDesign
                  name="caretright"
                  size={30}
                  color="black"
                  style={styles.btnIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <AddTimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleCreateTimer}
      />
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
  },
  leftContainer: {},
  timerListItem: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
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
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnIcon: {
    paddingRight: 16,
    color: "rgba(0,0,0,0.5)",
  },
});

export default HomeScreen;
