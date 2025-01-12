import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, { useState } from 'react';
  import DropDownPicker from 'react-native-dropdown-picker';
  
  const Field = ({ navigation, route }) => {
    const { nickname, birthday } = route.params;
    const [open, setOpen] = useState(false);
    const [fieldOpen, setFieldOpen] = useState(false);
    const [occupation, setOccupation] = React.useState('');
    const [field, setField] = React.useState('');
    const [customOccupation, setCustomOccupation] = useState('');
    const [customField, setCustomField] = useState('');
  
    const jobs = [
      '직장인',
      '프리랜서',
      '학생',
      '무직',
      '아르바이트',
      '기타(직접입력)',
    ];
    const fields = [
      'CEO/사업',
      '기획/전략',
      '마케팅/광고/홍보',
      '회계/세무/재무',
      '인사/HR',
      '총무/법무/사무',
      'IT 개발/데이터',
      '디자인',
      '영업/무역',
      '생산/물류/자재',
      '상품기획/MD',
      '건설/건축',
      '의료',
      'R&D/연구',
      '교육',
      '금융/보험',
      '공공/복지',
      '기타(직접입력)',
    ];
  
    const dropdownJobs = jobs.map((job) => ({
      label: job,
      value: job,
    }));
  
    const dropdownFields = fields.map((field) => ({
      label: field,
      value: field,
    }));
  
    const [jobItem, setJobItem] = useState(dropdownJobs);
    const [fieldItem, setFieldItem] = useState(dropdownFields);
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          평소 관심있는 {'\n'}직업과 분야를 선택해주세요(선택)
        </Text>
        <View style={{ rowGap: 20 }}>
          <DropDownPicker
            placeholder="직업 선택하기"
            open={open}
            value={occupation}
            items={jobItem}
            setOpen={(open) => {
              setOpen(open);
            }}
            setValue={setOccupation}
            setItems={setJobItem}
            style={{ borderColor: '#DCDADA' }}
            dropDownContainerStyle={{ borderColor: '#DCDADA' }}
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
          {occupation === '기타(직접입력)' && (
            <TextInput
              value={customOccupation}
              onChangeText={(text) => setCustomOccupation(text)}
              placeholder="직업을 입력하세요"
              style={styles.blank}
              placeholderTextColmor="#DCDADA"
            />
          )}
          <DropDownPicker
            placeholder="분야 선택하기"
            open={fieldOpen}
            value={field}
            items={fieldItem}
            setOpen={(open) => {
              setFieldOpen(open);
            }}
            setValue={setField}
            setItems={setFieldItem}
            style={{ borderColor: '#DCDADA' }}
            dropDownContainerStyle={{ borderColor: '#DCDADA' }}
            zIndex={2000}
            zIndexInverse={2000}
            textStyle={{
              fontSize: 20,
              fontWeight: 400,
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
          {field === '기타(직접입력)' && (
            <TextInput
              value={customField}
              onChangeText={(text) => setCustomField(text)}
              placeholder="분야를 입력하세요"
              style={styles.blank}
              placeholderTextColmor="#DCDADA"
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('consent', { nickname, birthday, occupation, field })}
        >
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
    title: { marginTop: 29.96, fontSize: 24, fontWeight: 600, marginBottom: 20 },
    button: {
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
  });
  
  export default Field;