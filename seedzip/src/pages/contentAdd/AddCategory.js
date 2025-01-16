import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {MyContext} from '../../../App';
import add from '../../assets/icons/add.png';
import {axiosInstance} from '../../api/axios-instance';

const AddCategory = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const {category, setCategory} = useContext(MyContext);
  const [addClick, setAddClick] = useState([{open: false}]);
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [category3, setCategory3] = useState('');
  const [category4, setCategory4] = useState('');
  const [category5, setCategory5] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const handleViewCategory = async () => {
    try {
      const axios = await axiosInstance();
      const response = await axios.get('/api/v1/category');
      const results = response.data.results;
      console.log('카테고리 이름 좀 보자', results);
      const names = results.map(item => item.name);
      setCategoryList(names);

      if (response.status === 200) {
        console.log('카테고리 조회 성공');
      } else {
        console.error('카테고리 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    handleViewCategory();
  }, []);
  console.log(categoryList);

  const dropdownCategory = categoryList.map(MyCategory => ({
    label: MyCategory,
    value: MyCategory,
  }));

  const [categoryItem, setCategoryItem] = useState(dropdownCategory);

  const handleAddDropdown = () => {
    if (addClick.length < 5) {
      setAddClick(prev => [...prev, {open: false}]);
    }
  };

  const handleSubmit = () => {
    const selectCategory = [
      category1,
      category2,
      category3,
      category4,
      category5,
    ];

    const uniqueCategories = [...new Set(selectCategory)]
      .map(item => item.trim())
      .filter(item => item !== '');

    setCategory(uniqueCategories);
    navigation.navigate('addTag');
  };

  useEffect(() => {
    console.log('선택한 카테고리: ', category);
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>카테고리를 선택하세요</Text>
      <Text style={styles.short}>카테고리는 5개까지 선택할 수 있어요.</Text>

      <View style={{rowGap: 20}}>
        <DropDownPicker
          placeholder="카테고리 선택하기"
          open={open}
          value={category1}
          items={categoryItem}
          setOpen={open => {
            setOpen(open);
          }}
          setValue={setCategory1}
          setItems={setCategoryItem}
          style={{borderColor: '#DCDADA'}}
          dropDownContainerStyle={{borderColor: '#DCDADA'}}
          zIndex={3000}
          zIndexInverse={1000}
          textStyle={{
            fontSize: 20,
            fontWeight: 400,
          }}
          placeholderStyle={{
            color: '#DCDADA',
          }}
        />
        {addClick.length > 1 && (
          <DropDownPicker
            placeholder="카테고리 선택하기"
            open={open2}
            value={category2}
            items={categoryItem}
            setOpen={open => {
              setOpen2(open);
            }}
            setValue={setCategory2}
            setItems={setCategoryItem}
            style={{borderColor: '#DCDADA'}}
            dropDownContainerStyle={{borderColor: '#DCDADA'}}
            zIndex={3000}
            zIndexInverse={1000}
            textStyle={{
              fontSize: 20,
              fontWeight: 400,
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
        )}
        {addClick.length > 2 && (
          <DropDownPicker
            placeholder="카테고리 선택하기"
            open={open3}
            value={category3}
            items={categoryItem}
            setOpen={open => {
              setOpen3(open);
            }}
            setValue={setCategory3}
            setItems={setCategoryItem}
            style={{borderColor: '#DCDADA'}}
            dropDownContainerStyle={{borderColor: '#DCDADA'}}
            zIndex={3000}
            zIndexInverse={1000}
            textStyle={{
              fontSize: 20,
              fontWeight: 400,
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
        )}
        {addClick.length > 3 && (
          <DropDownPicker
            placeholder="카테고리 선택하기"
            open={open4}
            value={category4}
            items={categoryItem}
            setOpen={open => {
              setOpen4(open);
            }}
            setValue={setCategory4}
            setItems={setCategoryItem}
            style={{borderColor: '#DCDADA'}}
            dropDownContainerStyle={{borderColor: '#DCDADA'}}
            zIndex={3000}
            zIndexInverse={1000}
            textStyle={{
              fontSize: 20,
              fontWeight: 400,
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
        )}
        {addClick.length > 4 && (
          <DropDownPicker
            placeholder="카테고리 선택하기"
            open={open5}
            value={category5}
            items={categoryItem}
            setOpen={open => {
              setOpen5(open);
            }}
            setValue={setCategory5}
            setItems={setCategoryItem}
            style={{borderColor: '#DCDADA'}}
            dropDownContainerStyle={{borderColor: '#DCDADA'}}
            zIndex={3000}
            zIndexInverse={1000}
            textStyle={{
              fontSize: 20,
              fontWeight: 400,
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
        )}
      </View>

      {addClick.length < 5 && (
        <TouchableOpacity
          style={styles.addContainer}
          onPress={handleAddDropdown}>
          <Image source={add} style={styles.addLogo} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        // disabled={category.length === 0}
        onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
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
  addLogo: {
    width: 56,
  },
  addContainer: {display: 'flex', alignItems: 'center', marginTop: 20},
  title: {marginTop: 29.96, fontSize: 24, fontWeight: 600},
  button: {
    width: 350,
    height: 51,
    border: 0,
    borderRadius: 10,
    backgroundColor: '#41C3AB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
  blank: {
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F2',
    border: 0,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 400,
  },
  short: {
    color: '#898989',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 28,
  },
});

export default AddCategory;
