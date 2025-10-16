import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import add from '../../assets/icons/add.png';
import { axiosInstance } from '../../api/axios-instance';

const EditCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categories: initialCategories, seed } = route.params;

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const [addClick, setAddClick] = useState([]);
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [category3, setCategory3] = useState(null);
  const [category4, setCategory4] = useState(null);
  const [category5, setCategory5] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const handleViewCategory = async () => {
    try {
      const axios = await axiosInstance();
      const response = await axios.get('/api/v1/category');
      const results = response.data.results;
      setCategoryList(results);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    handleViewCategory();
  }, []);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      const clicks = initialCategories.map(() => ({ open: false }));
      setAddClick(clicks.length > 0 ? clicks : [{ open: false }]);

      const categorySetters = [
        setCategory1,
        setCategory2,
        setCategory3,
        setCategory4,
        setCategory5,
      ];
      initialCategories.forEach((cat, index) => {
        if (index < categorySetters.length) {
          categorySetters[index](cat);
        }
      });
    } else {
      setAddClick([{ open: false }]);
    }
  }, [initialCategories]);

  const dropdownCategory = categoryList.map((MyCategory) => ({
    label: MyCategory.name,
    value: MyCategory.name,
  }));

  const handleAddDropdown = () => {
    if (addClick.length < 5) {
      setAddClick((prev) => [...prev, { open: false }]);
    }
  };

  const handleComplete = () => {
    const selectedCategoryNames = [
      category1,
      category2,
      category3,
      category4,
      category5,
    ].filter(Boolean);

    navigation.navigate('editSeed', {
      updatedCategories: selectedCategoryNames,
      seed,
    });
  };

  const categoryStates = [
    category1,
    category2,
    category3,
    category4,
    category5,
  ];
  const categorySetters = [
    setCategory1,
    setCategory2,
    setCategory3,
    setCategory4,
    setCategory5,
  ];
  const openStates = [open, open2, open3, open4, open5];
  const openSetters = [setOpen, setOpen2, setOpen3, setOpen4, setOpen5];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>카테고리를 수정하세요</Text>
      <Text style={styles.short}>카테고리는 5개까지 선택할 수 있어요.</Text>

      <View style={{ rowGap: 20, zIndex: 100 }}>
        {addClick.map((_, index) => (
          <DropDownPicker
            key={index}
            placeholder="카테고리 선택하기"
            open={openStates[index]}
            value={categoryStates[index]}
            items={dropdownCategory}
            setOpen={(o) => {
              openSetters.forEach((setter, i) =>
                setter(i === index ? o : false),
              );
            }}
            setValue={categorySetters[index]}
            style={{ borderColor: '#DCDADA' }}
            dropDownContainerStyle={{ borderColor: '#DCDADA' }}
            zIndex={3000 - index * 100}
            textStyle={{
              fontSize: 20,
              fontWeight: '400',
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
        ))}
      </View>

      {addClick.length < 5 && (
        <TouchableOpacity
          style={styles.addContainer}
          onPress={handleAddDropdown}
        >
          <Image source={add} style={styles.addLogo} />
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  backButton: {
    marginTop: 20,
  },
  addLogo: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  addContainer: { display: 'flex', alignItems: 'center', marginTop: 20 },
  title: { marginTop: 10, fontSize: 24, fontWeight: '600' },
  footer: {
    marginTop: 'auto',
    gap: 12,
    paddingTop: 20,
  },
  button: {
    width: '100%',
    height: 51,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  short: {
    color: '#898989',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 28,
    marginTop: 10,
  },
});

export default EditCategory;
