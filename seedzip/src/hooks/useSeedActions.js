import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { deleteSeed, deleteSeeds } from '../api/SeedApi';
import DeleteSeedModal from '../features/Seed/DeleteSeedModal';
import AlertToast from '../components/AlertToast';

const useSeedActions = ({ onDeleteSuccess, navigation }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [selectedSeedIds, setSelectedSeedIds] = useState(null);
  const [toast, setToast] = useState({ visible: false });

  const handleDeleteSeed = async () => {
    if (!selectedSeed) return;

    await deleteSeed(selectedSeed.seedId);

    setDeleteModalVisible(false);
    setSelectedSeed(null);

    setToast({
      visible: true,
      message: '씨드가 삭제되었어요.',
      icon: true,
    });

    if (onDeleteSuccess) {
      setTimeout(() => {
        onDeleteSuccess(selectedSeed.seedId);
      }, 1500);
    } else if (navigation) {
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }
  };

  const handleDeleteSeeds = async () => {
    if (!selectedSeedIds || selectedSeedIds.length === 0) return;

    await deleteSeeds(selectedSeedIds);

    setDeleteModalVisible(false);
    setSelectedSeedIds(null);

    if (onDeleteSuccess) {
      setToast({
        visible: true,
        message: '씨드가 삭제되었어요.',
        icon: true,
      });

      setTimeout(() => {
        onDeleteSuccess(selectedSeedIds);
      }, 1500);
    }
  };

  const openDeleteModal = (seed) => {
    setSelectedSeed(seed);
    setDeleteModalVisible(true);
  };

  const openMultipleDeleteModal = (seedIds) => {
    setSelectedSeedIds(seedIds);
    setDeleteModalVisible(true);
  };

  const seedActions = (seed) => [
    {
      icon: <Feather name="more-horizontal" size={20} />,
      label: '세부 정보 보기',
      onPress: () => {
        navigation.navigate('view', { seedId: seed.seedId });
      },
    },
    {
      icon: <Feather name="trash-2" size={20} />,
      label: '씨드 삭제하기',
      onPress: () => openDeleteModal(seed),
    },
  ];

  const SeedActionModals = () => (
    <>
      <DeleteSeedModal
        visible={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedSeed(null);
        }}
        onDelete={selectedSeedIds ? handleDeleteSeeds : handleDeleteSeed}
      />
      <AlertToast {...toast} onHide={() => setToast({ visible: false })} />
    </>
  );

  return {
    openDeleteModal,
    openMultipleDeleteModal,
    seedActions,
    SeedActionModals,
  };
};

export default useSeedActions;
