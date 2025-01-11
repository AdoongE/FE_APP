import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const Birthday = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);
  const [year, setYear] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [day, setDay] = React.useState('');
  const [touched, setTouched] = useState(false);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1970 + 1 }, (_, i) => ({
      label: `${currentYear - i}`,
      value: currentYear - i,
    }));
  }, []);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        label: `${(i + 1).toString().padStart(2, '0')}`, // 한 자리수일 경우 0 추가
        value: i + 1,
      })),
    [],
  );

  const days = useMemo(
    () =>
      Array.from({ length: 31 }, (_, i) => ({
        label: `${(i + 1).toString().padStart(2, '0')}`, // 한 자리수일 경우 0 추가
        value: i + 1,
      })),
    [],
  );
  const [items, setItems] = useState(years);
  const [monthItem, setMonthItem] = useState(months);
  const [dayItem, setDayItem] = useState(days);

  const error = touched && (!year || !month || !day);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>생년원일을 입력해주세요</Text>
      <View style={styles.picker}>
        <View style={{ zIndex: 3 }}>
          <DropDownPicker
            placeholder="YYYY"
            open={open}
            value={year}
            items={items}
            setOpen={(open) => {
              setOpen(open);
              if (!touched) setTouched(true);
            }}
            setValue={setYear}
            setItems={setItems}
            style={{ width: 145, borderColor: '#DCDADA' }}
            dropDownContainerStyle={{ width: 145, borderColor: '#DCDADA' }}
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
        </View>
        <View style={{ zIndex: 2 }}>
          <DropDownPicker
            placeholder="MM"
            open={monthOpen}
            value={month}
            items={monthItem}
            setOpen={(open) => {
              setMonthOpen(open);
              if (!touched) setTouched(true);
            }}
            setValue={setMonth}
            setItems={setMonthItem}
            style={{ width: 93, borderColor: '#DCDADA' }}
            dropDownContainerStyle={{ width: 93, borderColor: '#DCDADA' }}
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
        </View>
        <View style={{ zIndex: 1 }}>
          <DropDownPicker
            placeholder="DD"
            open={dayOpen}
            value={day}
            items={dayItem}
            setOpen={(open) => {
              setDayOpen(open);
              if (!touched) setTouched(true);
            }}
            setValue={setDay}
            setItems={setDayItem}
            style={{ width: 93, borderColor: '#DCDADA' }}
            dropDownContainerStyle={{ width: 93, borderColor: '#DCDADA' }}
            zIndex={1000}
            zIndexInverse={3000}
            textStyle={{
              fontSize: 20,
              fontWeight: 400,
            }}
            placeholderStyle={{
              color: '#DCDADA',
            }}
          />
        </View>
      </View>
      {error && (
        <Text style={styles.error}>생년원일을 모두 입력하지 않았어요</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        disabled={error || !touched}
        onPress={() => navigation.navigate('field')}
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
    zIndex: 3000,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: { marginTop: 29.96, fontSize: 24, fontWeight: 600, marginBottom: 20 },
  input: {
    borderBottomWidth: 1,
    fontSize: 20,
    paddingBottom: 13,
  },
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
  error: {
    color: '#FF0000',
    fontWeight: 400,
    fontSize: 12,
    marginTop: 8,
  },
  picker: {
    flexDirection: 'row',
    columnGap: 9,
    zIndex: 1,
  },
});

export default Birthday;