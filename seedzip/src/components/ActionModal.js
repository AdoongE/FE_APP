import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ActionModal({
  visible,
  onClose,
  title,
  actions = [],
  modalStyle,
  contentStyle,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.backdrop, modalStyle]}>
        <View style={[styles.container, contentStyle]}>
          <View style={styles.handleBar} />
          <Text style={styles.title}>{title}</Text>
          {actions.map((act, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.button,
                idx === actions.length - 1 && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.7}
              onPress={() => {
                act.onPress();
                onClose();
              }}
            >
              {act.icon}
              <Text style={styles.buttonText}>{act.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'flex-start',
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  closeButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});
