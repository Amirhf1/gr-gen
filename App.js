import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const App = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [currentCode, setCurrentCode] = useState(null);

  const generateQRCode = (number) => {
    return (
      <View style={styles.qrCodeContainer}>
        <QRCode value={number.toString()} size={500} />
        <Text style={styles.qrCodeLabel}>{`${number}`}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (start && end) {
      let current = parseInt(start);
      const intervalId = setInterval(() => {
        setCurrentCode(generateQRCode(current));
        current += 1;
        if (current > parseInt(end)) {
          clearInterval(intervalId);
        }
      }, 90);
      return () => clearInterval(intervalId);
    }
  }, [start, end]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setStart}
          value={start}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>End:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setEnd}
          value={end}
        />
      </View>
      <View style={styles.qrCodeWrapper}>{currentCode}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10a666', // Set background color to light blue
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 200,
    fontSize: 18,
  },
  qrCodeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  qrCodeLabel: {
    fontSize: 10,
    fontWeight: 'normal',
    marginBottom: 10,
  },
});

export default App;
