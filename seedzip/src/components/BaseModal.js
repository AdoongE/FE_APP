import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BaseModal({
  visible,
  onCancel,
  onConfirm,
  cancelText = '취소',
  confirmText = '확인',
  children,
}) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {children}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, styles.cancelBtn]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.confirmBtn]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '76%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F0F0F0',
  },
  confirmBtn: {
    backgroundColor: '#41C3AB',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#4F4F4F',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#FFF',
  },
});
