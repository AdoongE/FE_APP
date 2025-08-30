import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookmarkMinusIcon from '../assets/icons/bookmarkMinus.png';
import BookmarkPlusIcon from '../assets/icons/bookmarkPlus.png';
import EditIcon from '../assets/icons/edit.png';
import TrashIcon from '../assets/icons/trash.png';
import {
  deleteBookmark,
  postBookmark,
  deleteCategory,
  patchCategory,
} from '../api/CategoryApi';
import EditCategoryModal from '../features/Category/EditCategoryModal';
import AlertToast from '../components/AlertToast';

const useCategoryActions = ({
  fetchBookmark,
  fetchMyCategory,
  setBookmarks,
  handleShowFull,
  bookmarks,
}) => {
  const [toast, setToast] = useState({ visible: false });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [renameTarget, setRenameTarget] = useState(null);

  const handleEditCategory = async (newName) => {
    if (!renameTarget) return;
    await patchCategory(newName, renameTarget.id);
    setOpenEditModal(false);
    setRenameTarget(null);
    if (fetchMyCategory) await fetchMyCategory();
    if (fetchBookmark) await fetchBookmark();
  };

  const actionBtnsBookmark = (item) => [
    {
      icon: <Image source={BookmarkMinusIcon} style={styles.iconSize} />,
      label: '북마크에서 제거',
      onPress: async () => {
        if (setBookmarks) {
          setBookmarks((prev) =>
            prev.filter((b) => b.bookmarkId !== item.bookmarkId),
          );
        }
        setTimeout(() => {
          setToast({
            visible: true,
            message: '북마크에서 제거되었어요',
            icon: true,
          });
        }, 200);
        await deleteBookmark(item.bookmarkId);
        if (fetchBookmark) await fetchBookmark();
      },
    },
    {
      icon: <Image source={EditIcon} style={styles.iconSize} />,
      label: '이름 변경',
      onPress: () => {
        setRenameTarget(item);
        setOpenEditModal(true);
      },
    },
    {
      icon: <Image source={TrashIcon} style={styles.iconSize} />,
      label: '카테고리 삭제',
      onPress: async () => {
        if (setBookmarks) {
          setBookmarks((prev) =>
            prev.filter((b) => b.bookmarkId !== item.bookmarkId),
          );
        }
        setTimeout(() => {
          setToast({
            visible: true,
            message: '카테고리가 제거되었어요',
            icon: (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={18} color="#fff" />
              </View>
            ),
          });
        }, 200);
        await deleteCategory(item.id);
        if (fetchMyCategory) await fetchMyCategory();
        if (fetchBookmark) await fetchBookmark();
      },
    },
  ];

  const actionBtnsMyCategory = (item) => [
    {
      icon: <Image source={BookmarkPlusIcon} style={styles.iconSize} />,
      label: '북마크에 추가',
      onPress: async () => {
        await postBookmark(item.id);
        if (fetchBookmark) await fetchBookmark();
        setTimeout(() => {
          setToast({
            visible: true,
            message: '북마크에 추가되었어요',
            actionText: '보러가기',
            onActionPress: () => {
              if (handleShowFull) {
                handleShowFull({
                  title: '북마크 전체보기',
                  iconName: 'bookmark-outline',
                  data: bookmarks,
                  actionBtns: actionBtnsBookmark,
                  emptyTitle: '아직 북마크한 카테고리가 없어요',
                  emptySubtitle: '자주 보는 카테고리를 북마크 해보세요!',
                });
              }
            },
          });
        }, 200);
      },
    },
    {
      icon: <Image source={EditIcon} style={styles.iconSize} />,
      label: '이름 변경',
      onPress: () => {
        setRenameTarget(item);
        setOpenEditModal(true);
      },
    },
    {
      icon: <Image source={TrashIcon} style={styles.iconSize} />,
      label: '카테고리 삭제',
      onPress: async () => {
        setTimeout(() => {
          setToast({
            visible: true,
            message: '카테고리가 제거되었어요',
            icon: (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={18} color="#fff" />
              </View>
            ),
          });
        }, 200);
        await deleteCategory(item.id);
        if (fetchMyCategory) await fetchMyCategory();
        if (fetchBookmark) await fetchBookmark();
      },
    },
  ];

  const ActionModalAlert = () => (
    <>
      <AlertToast {...toast} onHide={() => setToast({ visible: false })} />
      <EditCategoryModal
        visible={openEditModal}
        initialName={renameTarget?.name || ''}
        onCancel={() => {
          setOpenEditModal(false);
          setRenameTarget(null);
        }}
        onEdit={handleEditCategory}
      />
    </>
  );

  return { actionBtnsBookmark, actionBtnsMyCategory, ActionModalAlert };
};

export default useCategoryActions;

const styles = StyleSheet.create({
  iconSize: {
    width: 20,
    height: 20,
  },
  checkIcon: {
    backgroundColor: '#41C3AB',
    borderRadius: 20,
    padding: 2,
  },
});
