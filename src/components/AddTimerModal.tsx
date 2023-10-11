import { Button } from "@rneui/base";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

interface AddTimerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}

const AddTimerModal: React.FC<AddTimerModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    onSave(inputValue);
    onClose();
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
            <TouchableOpacity onPress={handleSave} style={styles.buttonContent}>
              <Button size="md" titleStyle={styles.buttonText}>
                保存
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.buttonContent}>
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
