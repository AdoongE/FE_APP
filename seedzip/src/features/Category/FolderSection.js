import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Folder from '../../components/Folder';

const FolderSection = ({
  title,
  iconName,
  data,
  onPressMore, // 전체보기
  hideViewAll = false,
}) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Ionicons name={iconName} size={20} color="#000" />
        <Text style={styles.title}>{title}</Text>
      </View>
      {!hideViewAll && (
        <TouchableOpacity style={styles.viewAllBtn} onPress={onPressMore}>
          <Text style={styles.viewAllText}>전체보기</Text>
          <Ionicons name="chevron-forward" size={16} color="#9f9f9f" />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity style={styles.viewAllBtn} onPress={onPressMore}>
        <Text style={styles.viewAllText}>전체보기</Text>
        <Ionicons name="chevron-forward" size={16} color="#9f9f9f" />
      </TouchableOpacity> */}
    </View>

    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Folder
            name={item.name}
            onPressMore={() => {
              /* 추가 */
            }}
          />
        </View>
      )}
      scrollEnabled={false}
    />
  </View>
);

export default FolderSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 4,
    fontSize: 18,
    fontWeight: 600,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    color: '#9f9f9f',
    marginRight: 2,
  },
  listContent: {
    gap: 20,
  },

  item: {
    marginHorizontal: 8,
  },
});
