import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import folderIcon from '../assets/icons/folder.png';

const Folder = ({ name, onPressMore }) => {
  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image source={folderIcon} style={styles.image} />
        <TouchableOpacity style={styles.moreButton} onPress={onPressMore}>
          <MaterialIcons name="more-vert" size={16} color="#4f4f4f" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default Folder;

const styles = StyleSheet.create({
  imageWrapper: {
    width: '105',
    height: '84',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  moreButton: {
    position: 'absolute',
    top: 24,
    right: 3,
    color: 'red',
  },
  label: {
    fontSize: 14,
    marginTop: '4',
    marginLeft: '5',
  },
});
