import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  return (
    <View style={{ alignItems: "center" }}>
      <Text>react-timer-hook</Text>
      <Text>Stopwatch Demo</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 30 }}>{days}日</Text>
        <Text style={{ fontSize: 30 }}>{hours}時</Text>
        <Text style={{ fontSize: 30 }}>{minutes}分</Text>
        <Text style={{ fontSize: 30 }}>{seconds}秒</Text>
      </View>
      <Text>{isRunning ? "Running" : "Not running"}</Text>
      <TouchableOpacity onPress={start}>
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pause}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <View>
      <MyStopwatch />
    </View>
  );
}
