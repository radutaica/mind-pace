import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

interface TimeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTime: (focusTime: number, relaxTime: number) => void;
}

export default function TimeSelectionModal({ visible, onClose, onSelectTime }: TimeSelectionModalProps) {
  const [focusTime, setFocusTime] = useState(0.5); // Default 0.5 minutes
  const relaxTime = 1 - focusTime; // Automatically calculate relax time based on 1 minute total
  
  const handleConfirm = () => {
    onSelectTime(focusTime, relaxTime);
    onClose();
  };
  
  const handleCancel = () => {
    onClose();
  };
  
  const formatTime = (minutes: number) => {
    const seconds = Math.round(minutes * 60);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Set Your Focus Time</Text>
              
              <View style={styles.timeDisplay}>
                <View style={styles.timeItem}>
                  <Text style={styles.timeLabel}>Focus Time</Text>
                  <Text style={styles.timeValue}>{formatTime(focusTime)}</Text>
                </View>
                <View style={styles.timeItem}>
                  <Text style={styles.timeLabel}>Relax Time</Text>
                  <Text style={styles.timeValue}>{formatTime(relaxTime)}</Text>
                </View>
              </View>
              
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0.1}
                  maximumValue={0.9}
                  step={0.1}
                  value={focusTime}
                  onValueChange={(value: number) => setFocusTime(value)}
                  minimumTrackTintColor="#1F3B2C"
                  maximumTrackTintColor="#DDDDDD"
                  thumbTintColor="#1F3B2C"
                />
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>6s</Text>
                  <Text style={styles.sliderLabel}>30s</Text>
                  <Text style={styles.sliderLabel}>54s</Text>
                </View>
              </View>
              
              <Text style={styles.hintText}>
                Total session time: 1 minute
              </Text>
              
              <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={handleCancel}
                >
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton]} 
                  onPress={handleConfirm}
                >
                  <Text style={styles.buttonText}>Start Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: windowWidth * 0.85,
    backgroundColor: 'rgb(255, 234, 186)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: '#1F3B2C',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  timeItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(31, 59, 44, 0.08)',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    margin: 5,
  },
  timeLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#1F3B2C',
    opacity: 0.8,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: '#1F3B2C',
  },
  sliderContainer: {
    width: '100%',
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#1F3B2C',
    opacity: 0.6,
  },
  hintText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#1F3B2C',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#1F3B2C',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1F3B2C',
  },
  buttonText: {
    color: '#FFF1D6',
    fontSize: 15,
    fontFamily: 'Quicksand',
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#1F3B2C',
  }
}); 