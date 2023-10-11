import { Button } from "@rneui/base";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";

interface AddTimerModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (timerTitle: string) => void;
}

const AddTimerModal: React.FC<AddTimerModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    console.log("inputValue");
    console.log(inputValue);

    if (!inputValue) {
      Alert.alert("タイマーの名称を入力してください");
      return;
    }

    onAdd(inputValue);
    onClose();
    setInputValue("");
  };

  const handleClose = () => {
    onClose();
    setInputValue("");
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>タイマーの名称</Text>
          <TextInput
            placeholder="タイマーの名前"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            style={styles.input}
          />
          <View>
            <TouchableOpacity style={styles.buttonContent}>
              <Button
                size="md"
                titleStyle={styles.buttonText}
                onPress={handleSave}
              >
                追加
              </Button>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={handleClose}
            >
              <Button
                title="閉じる"
                type="outline"
                disabled
                titleStyle={styles.buttonText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 10,
    elevation: 5,
  },
  titleText: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  buttonContent: {
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default AddTimerModal;
