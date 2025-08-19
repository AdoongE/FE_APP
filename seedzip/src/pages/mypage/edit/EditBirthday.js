import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditBirthday() {
  const navigation = useNavigation();
  const route = useRoute();

  const initial = (() => {
    const b = route?.params?.birthday;
    if (typeof b === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(b)) {
      const [y, m, d] = b.split('-').map(Number);
      return { y, m, d };
    }
    return { y: 2002, m: 7, d: 25 };
  })();

  const [openY, setOpenY] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [year, setYear] = useState(initial.y);
  const [month, setMonth] = useState(initial.m);
  const [day, setDay] = useState(initial.d);

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    const from = 1900;
    return Array.from({ length: current - from + 1 }, (_, i) => {
      const y = current - i;
      return { label: String(y), value: y };
    });
  }, []);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const m = i + 1;
        return { label: String(m).padStart(2, '0'), value: m };
      }),
    [],
  );

  const maxDay = useMemo(() => {
    return new Date(year, month, 0).getDate();
  }, [year, month]);

  const days = useMemo(
    () =>
      Array.from({ length: maxDay }, (_, i) => {
        const d = i + 1;
        return { label: String(d).padStart(2, '0'), value: d };
      }),
    [maxDay],
  );

  if (day > maxDay) setDay(maxDay);

  const disabled = !(year && month && day);

  const onSave = () => {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const birthday = `${year}-${mm}-${dd}`;

    route.params?.setBirthday?.(birthday);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#111"
          onPress={() => navigation.goBack()}
        />
        <Text style={s.headerTitle}>회원정보 수정</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={s.body}>
        <View style={s.content}>
          <Text style={s.guide}>수정할 생년월일을 선택해주세요</Text>

          <View style={s.row}>
            <View style={[s.ddWrap, { zIndex: 30, elevation: 30 }]}>
              <DropDownPicker
                open={openY}
                value={year}
                items={years}
                setOpen={(o) => {
                  setOpenY(o);
                  if (o) {
                    setOpenM(false);
                    setOpenD(false);
                  }
                }}
                setValue={setYear}
                style={s.ddInput}
                dropDownContainerStyle={s.ddMenu}
                listItemContainerStyle={s.ddItem}
                textStyle={s.ddText}
                ArrowDownIconComponent={() => (
                  <Ionicons name="chevron-down" size={18} color="#111" />
                )}
                ArrowUpIconComponent={() => (
                  <Ionicons name="chevron-up" size={18} color="#111" />
                )}
              />
            </View>

            <View style={[s.ddWrap, s.ddMid, { zIndex: 20, elevation: 20 }]}>
              <DropDownPicker
                open={openM}
                value={month}
                items={months}
                setOpen={(o) => {
                  setOpenM(o);
                  if (o) {
                    setOpenY(false);
                    setOpenD(false);
                  }
                }}
                setValue={setMonth}
                style={s.ddInput}
                dropDownContainerStyle={s.ddMenu}
                listItemContainerStyle={s.ddItem}
                textStyle={s.ddText}
                ArrowDownIconComponent={() => (
                  <Ionicons name="chevron-down" size={18} color="#111" />
                )}
                ArrowUpIconComponent={() => (
                  <Ionicons name="chevron-up" size={18} color="#111" />
                )}
              />
            </View>

            <View style={[s.ddWrap, { zIndex: 10, elevation: 10 }]}>
              <DropDownPicker
                open={openD}
                value={day}
                items={days}
                setOpen={(o) => {
                  setOpenD(o);
                  if (o) {
                    setOpenY(false);
                    setOpenM(false);
                  }
                }}
                setValue={setDay}
                style={s.ddInput}
                dropDownContainerStyle={s.ddMenu}
                listItemContainerStyle={s.ddItem}
                textStyle={s.ddText}
                ArrowDownIconComponent={() => (
                  <Ionicons name="chevron-down" size={18} color="#111" />
                )}
                ArrowUpIconComponent={() => (
                  <Ionicons name="chevron-up" size={18} color="#111" />
                )}
              />
            </View>
          </View>
        </View>

        <Pressable
          style={[s.saveBtn, disabled && s.saveBtnDisabled]}
          disabled={disabled}
          onPress={onSave}
        >
          <Text style={s.saveText}>저장</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111' },

  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  guide: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#111',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  ddWrap: { flex: 1, minWidth: 90 },
  ddMid: { flex: 0.8 },
  ddInput: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
  },
  ddMenu: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
  },
  ddItem: { minHeight: 42 },
  ddText: { fontSize: 18, color: '#111' },

  saveBtn: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#41C3AB',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
